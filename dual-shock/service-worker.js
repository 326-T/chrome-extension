chrome.runtime.onInstalled.addListener(() => {
  console.log("DualShock Input extension installed");
});

// Service Workerは長時間実行できないため、メッセージングを使用
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "pollGamepads") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "pollGamepads" });
    });
  }
});
