import { WebClient } from "@slack/web-api";
// Note: 'dotenv' is usually not needed in GHA because GitHub sets env vars directly

export default async ({ context }) => {
  const { SLACK_CHANNEL_ID, SLACK_OAUTH_TOKEN, GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_RUN_NUMBER } = process.env;

  const client = new WebClient(SLACK_OAUTH_TOKEN, { logLevel: "error" });
  const tags = "U0AL3V168E5";

  // Using 'context' allows you to get the workflow name automatically
  const workflowName = context.workflow || "Workflow";
  const title = "GHA Workflow Failure Alert";
  const message = "The failure occurred before or outside the actual test execution.";
  const runUrl = `https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;

  const tagString = tags
    ? tags
        .split(",")
        .map((id) => `<@${id.trim()}>`)
        .join(" ")
    : "";

  const messageBlocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: [
          `*⚠️ ${title}*`, // Moved title here to prevent duplicate headers
          `*Status:* A workflow step failed.`,
          `*Detail:* ${message}`,
          `*Build:* <${runUrl}|${workflowName} #${GITHUB_RUN_NUMBER}>`,
          ``,
          `${tagString} Please review.`,
        ].join("\n"),
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "View Run" },
          url: runUrl,
          style: "danger",
        },
      ],
    },
  ];

  try {
    await client.chat.postMessage({
      channel: SLACK_CHANNEL_ID,
      text: `🚨 Failure in ${workflowName}`,
      attachments: [
        {
          color: "#f20505",
          blocks: messageBlocks,
        },
      ],
    });
    console.log("✅ Notification sent successfully");
  } catch (error) {
    console.error("❌ Error sending Slack notification:", error);
  }
};
