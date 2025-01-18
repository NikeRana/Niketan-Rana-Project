console.log("Background service worker is running!");

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ copiedItems: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveCopy") {

        const newItem = {
            text: request.text,
            url: request.url,
        };

        chrome.storage.local.get("copiedItems", (data) => {
            const copiedItems = data.copiedItems || [];
            copiedItems.push(newItem);
            chrome.storage.local.set({ copiedItems }, () => {
            });
        });
    }
});
