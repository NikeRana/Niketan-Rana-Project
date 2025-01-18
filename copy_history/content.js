let debounceTimeout;
let lastCopiedText = "";  // Variable to store the last copied text

document.addEventListener("copy", (e) => {
  const copiedText = window.getSelection().toString();
  const currentUrl = window.location.href;

  // Check if there is any copied text and if it's different from the last copied text
  if (copiedText && copiedText !== lastCopiedText) {
    // Clear any previous timeout
    clearTimeout(debounceTimeout);

    // Set a new timeout to save the copied text after a delay
    debounceTimeout = setTimeout(() => {
      chrome.runtime.sendMessage({
        action: "saveCopy",
        text: copiedText,
        url: currentUrl
      });

      // Store the copied text to prevent saving duplicates
      lastCopiedText = copiedText;
    }, 500);  // Delay in milliseconds (e.g., 500ms)
  } else {
    console.log("No new text copied or the text is the same.");
  }
});

// Mark that the content.js has been injected
chrome.storage.local.set({ contentScriptLoaded: true });
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.local.set({ contentScriptLoaded: true });
// });