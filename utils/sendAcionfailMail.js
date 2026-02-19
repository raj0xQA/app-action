import { sendEmail } from "./sendEmail.js";


async function main() {
    const subject = `❌ Workflow Failed: Push Notification Test`;
    const message = `
        🟠 Workflow Failure Alert (Non-Test Failure)

        The workflow failed, but the test suite did NOT execute.
        This appears to be an infrastructure or environment issue 
        (e.g., emulator startup failure, setup issue, or configuration error).
        `;

    await sendEmail(subject, message);
}

main().catch(console.error);
