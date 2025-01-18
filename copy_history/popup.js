window.onload = function () {
    chrome.storage.local.get(["copiedItems", "contentScriptLoaded"], function (data) {
        console.log(data);  // Check if data is being fetched correctly
        const copiedItems = data.copiedItems || [];
        const listDiv = document.getElementById("copiesList");

        if (copiedItems.length === 0) {
            if (data.contentScriptLoaded) {
                listDiv.innerHTML = "No copied items found. <p>or</p> <p class='first-time'>* Reload the page </p>";
            } else {
                listDiv.innerHTML = "No copied items found. <p class='first-time'>* For the first time please load the page once or start the browser again </p>";
            }
        } else {
            copiedItems.forEach((item, index) => {
                const textDiv = document.createElement("div");
                textDiv.classList.add("copy-item");

                // Helper function to truncate text
                function truncateText(text, maxLength) {
                    return text.length > maxLength
                        ? text.substring(0, maxLength) + "..."
                        : text;
                }

                // Truncate text and URL
                const truncatedText = truncateText(item.text, 60); // Adjust length as needed
                const truncatedUrl = truncateText(item.url, 30);  // Adjust length as needed

                // Text and URL section
                const textContainer = document.createElement("div");
                textContainer.classList.add("text-container");

                const textContent = document.createElement("p");
                textContent.textContent = truncatedText;
                

                const urlContent = document.createElement("small");
                urlContent.textContent = truncatedUrl;
                urlContent.onclick = function () {
                    window.open(item.url, "_blank");
                };

                textContainer.appendChild(textContent);
                textContainer.appendChild(urlContent);

                // Copy button
                const copyButton = document.createElement("button");
                copyButton.classList.add("copy-button")
                copyButton.innerHTML = '<span class="icon copy"></span>';
                copyButton.onclick = function () {
                    navigator.clipboard.writeText(item.text);
                };

                // Delete button
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button")
                deleteButton.innerHTML = '<span class="icon delete"></span>';
                deleteButton.onclick = function () {
                    copiedItems.splice(index, 1);
                    chrome.storage.local.set({ copiedItems });
                    textDiv.remove();
                };

                textDiv.appendChild(textContainer);
                textDiv.appendChild(copyButton);
                textDiv.appendChild(deleteButton);
                listDiv.appendChild(textDiv);
            });
        }

        document.getElementById("clearAll").onclick = function () {
            chrome.storage.local.set({ copiedItems: [] });
            listDiv.innerHTML = "No copied items found.";
        };
    });
};


// window.onload = function () {
//     chrome.storage.local.get("copiedItems", function (data) {
//         const copiedItems = data.copiedItems || [];
//         const listDiv = document.getElementById("copiesList");

//         if (copiedItems.length === 0) {
//             listDiv.innerHTML = "No copied items found. <p class='first-time'>* For the first time please load the page once </p>";
//         } else {
//             copiedItems.forEach((item, index) => {
//                 const textDiv = document.createElement("div");
//                 textDiv.classList.add("copy-item");

//                 // Helper function to truncate text
//                 function truncateText(text, maxLength) {
//                     return text.length > maxLength
//                         ? text.substring(0, maxLength) + "..."
//                         : text;
//                 }

//                 // Truncate text and URL
//                 const truncatedText = truncateText(item.text, 60); // Adjust length as needed
//                 const truncatedUrl = truncateText(item.url, 30);  // Adjust length as needed

//                 // Text and URL section
//                 const textContainer = document.createElement("div");
//                 textContainer.classList.add("text-container");

//                 const textContent = document.createElement("p");
//                 textContent.textContent = truncatedText;
                

//                 const urlContent = document.createElement("small");
//                 urlContent.textContent = truncatedUrl;
//                 urlContent.onclick = function () {
//                     window.open(item.url, "_blank");
//                 };

//                 textContainer.appendChild(textContent);
//                 textContainer.appendChild(urlContent);

//                 // Copy button
//                 const copyButton = document.createElement("button");
//                 copyButton.classList.add("copy-button")
//                 copyButton.innerHTML = '<span class="icon copy"></span>';
//                 copyButton.onclick = function () {
//                     navigator.clipboard.writeText(item.text);
//                 };

//                 // Delete button
//                 const deleteButton = document.createElement("button");
//                 deleteButton.classList.add("delete-button")
//                 deleteButton.innerHTML = '<span class="icon delete"></span>';
//                 deleteButton.onclick = function () {
//                     copiedItems.splice(index, 1);
//                     chrome.storage.local.set({ copiedItems });
//                     textDiv.remove();
//                 };

//                 textDiv.appendChild(textContainer);
//                 textDiv.appendChild(copyButton);
//                 textDiv.appendChild(deleteButton);
//                 listDiv.appendChild(textDiv);
//             });
//         }

//         document.getElementById("clearAll").onclick = function () {
//             chrome.storage.local.set({ copiedItems: [] });
//             listDiv.innerHTML = "No copied items found.";
//         };
//     });
// };
