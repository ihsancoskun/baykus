"use client";

import { useEffect } from "react";

export function ContentAnimator() {
  useEffect(() => {
    const container = document.querySelector(".course-content");
    if (!container) return;

    // We only want to restructure once
    if (container.classList.contains("is-ready")) return;

    try {
      // We want to group content into "rows"
      const children = Array.from(container.childNodes);
      
      let blocks: any[] = [];
      let currentBlock: any = { textNodes: [], image: null };

      children.forEach((node: any) => {
        let isImageNode = false;
        let imgElement = null;

        if (node.tagName && node.tagName.toUpperCase() === 'IMG') {
          isImageNode = true;
          imgElement = node.cloneNode(true); // Clone to be safe
        } else if (node.tagName && node.tagName.toUpperCase() === 'P' && node.querySelector('img')) {
          isImageNode = true;
          imgElement = node.querySelector('img').cloneNode(true);
        }

        if (isImageNode) {
          if (currentBlock.image || currentBlock.textNodes.length > 0) {
            blocks.push(currentBlock);
            currentBlock = { textNodes: [], image: null };
          }
          currentBlock.image = imgElement;
        } else {
          if (node.nodeType === 3 && (!node.textContent || node.textContent.trim() === "")) return;
          // Clone the node so we don't mess with React's managed DOM
          currentBlock.textNodes.push(node.cloneNode(true));
        }
      });
      
      if (currentBlock.textNodes.length > 0 || currentBlock.image) {
        blocks.push(currentBlock);
      }

      // Now reconstruct the DOM safely
      // We will create a new div and replace the innerHTML
      const newWrapper = document.createElement("div");
      newWrapper.className = "flex flex-col gap-16 md:gap-24";

      blocks.forEach((block, index) => {
        const row = document.createElement("div");
        row.className = `flex flex-col lg:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`;

        const imgCol = document.createElement("div");
        imgCol.className = "w-full lg:w-1/2 flex justify-center";
        
        if (block.image) {
            block.image.className = "rounded-2xl shadow-xl w-full h-auto object-cover max-h-[400px]";
            imgCol.appendChild(block.image);
        } else {
            imgCol.className = "hidden";
        }

        const textCol = document.createElement("div");
        textCol.className = block.image 
          ? "w-full lg:w-1/2 flex flex-col justify-center space-y-4" 
          : "w-full flex flex-col justify-center space-y-4";
          
        block.textNodes.forEach((node: any) => textCol.appendChild(node));

        row.appendChild(imgCol);
        row.appendChild(textCol);
        newWrapper.appendChild(row);

        row.classList.add("animate-on-scroll", index % 2 === 0 ? "animate-slide-left" : "animate-slide-right");
      });

      container.innerHTML = "";
      container.appendChild(newWrapper);
      
      // Mark as ready to show
      container.classList.add("is-ready");

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

      const rows = newWrapper.querySelectorAll("> div");
      rows.forEach(r => observer.observe(r));

      return () => observer.disconnect();
    } catch (error) {
      console.error("Failed to parse blocks:", error);
      container.classList.add("is-ready"); // Ensure visibility on failure
    }
  }, []);

  return null;
}
