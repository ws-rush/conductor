import { pi } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";
import fs from 'fs';

function promptUserFallback(questionObj) {
  try {
    const ttyFdOut = fs.openSync('/dev/tty', 'w');
    const ttyFdIn = fs.openSync('/dev/tty', 'r');
    
    let promptText = `\n\x1b[1m\x1b[36m[Conductor Prompt]\x1b[0m ${questionObj.question}\n`;
    
    if (questionObj.type === 'choice' && questionObj.options) {
      questionObj.options.forEach((opt, index) => {
        const label = opt.label || opt.Label || opt;
        const desc = opt.description || opt.Description || '';
        promptText += `  \x1b[33m[${index + 1}]\x1b[0m ${label}${desc ? ` - \x1b[90m${desc}\x1b[0m` : ''}\n`;
      });
      promptText += `\x1b[90mEnter number (1-${questionObj.options.length}):\x1b[0m `;
    } else if (questionObj.type === 'yesno') {
      promptText += `\x1b[90m(y/n):\x1b[0m `;
    } else {
      promptText += `> `;
    }
    
    fs.writeSync(ttyFdOut, promptText);
    
    let buffer = Buffer.alloc(1024);
    let bytesRead = fs.readSync(ttyFdIn, buffer, 0, 1024, null);
    
    fs.closeSync(ttyFdOut);
    fs.closeSync(ttyFdIn);
    
    const ans = buffer.toString('utf8', 0, bytesRead).trim();
    
    if (questionObj.type === 'choice' && questionObj.options) {
      const index = parseInt(ans, 10) - 1;
      if (index >= 0 && index < questionObj.options.length) {
         const selection = questionObj.options[index];
         return selection.label || selection.Label || selection;
      }
      return `Invalid selection: ${ans}`;
    }
    return ans;
  } catch (e) {
    return `[Fallback] Prompting failed: ${e.message}`;
  }
}

pi.registerTool({
  name: "ask_user",
  description: "Interactively prompts the user with questions. Supports text, choice, and yesno types.",
  parameters: Type.Object({
    questions: Type.Array(
      Type.Object({
        header: Type.Optional(Type.String({ description: "Optional header for the question section" })),
        question: Type.String({ description: "The question prompt text" }),
        type: Type.String({ enum: ["text", "choice", "yesno"], description: "The input response type" }),
        multiSelect: Type.Optional(Type.Boolean({ description: "Allow multiple selections" })),
        options: Type.Optional(Type.Array(Type.Any(), { description: "List of options for choice types" }))
      })
    )
  }),
  execute: async (toolCallId, params) => {
    let answers = [];
    const questions = params.questions || [];
    
    for (const q of questions) {
       let ans;
       // Attempt to use framework TUI prompt if available
       if (pi.ui && typeof pi.ui.input === 'function') {
          if (q.type === 'yesno') {
             ans = await pi.ui.confirm(q.question) ? 'Yes' : 'No';
          } else if (q.type === 'choice' && q.options) {
             const labels = q.options.map(opt => opt.label || opt.Label || opt);
             ans = await pi.ui.select(q.question, labels, { multi: q.multiSelect || false });
          } else {
             ans = await pi.ui.input(q.question);
          }
       } else {
          // Fallback to raw tty pipeline if non-buffered overlays are needed
          ans = promptUserFallback(q);
       }
       answers.push({ header: q.header || '', question: q.question, answer: ans });
    }
    
    return { content: [{ type: "text", text: JSON.stringify(answers) }] };
  },
});
