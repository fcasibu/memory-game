(() => {
  const Game = {
    utilities() {
      this.letterArr = [
        "a",
        "a",
        "b",
        "b",
        "c",
        "c",
        "d",
        "d",
        "e",
        "e",
        "f",
        "f",
        "g",
        "g",
        "h",
        "h",
        "i",
        "i",
        "j",
        "j",
        "k",
        "k",
        "l",
        "l",
      ];
      this.counter = 0;
      this.guessArr = [];
      this.itemIndex = [];
    },

    initializeHelpModal() {
      const helpModal = document.querySelector(".help-modal");
      const buttonPlay = document.querySelector(".btn--play");
      helpModal.style.display = "flex";
      buttonPlay.addEventListener("click", () => {
        helpModal.style.display = "none";
        this.startTime();
      });
    },

    initializeEndModal() {
      const endModal = document.querySelector(".end-modal");
      const buttonReset = document.querySelector(".btn--reset");

      endModal.style.display = "flex";

      buttonReset.addEventListener("click", () => {
        endModal.style.display = "none";
        window.location.reload();
      });
    },

    shuffleItems() {
      for (let i = this.letterArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [this.letterArr[i], this.letterArr[j]] = [
          this.letterArr[j],
          this.letterArr[i],
        ];
      }
    },

    createGrid() {
      this.gridContainer = document.createElement("div");
      this.gridContainer.classList.add("grid-container");
      document.body.prepend(this.gridContainer);
      for (let i = 0; i < 24; i++) {
        this.item = document.createElement("div");
        this.itemInner = document.createElement("div");
        this.itemOverlay = document.createElement("div");
        this.itemText = document.createElement("p");
        this.item.classList.add("grid-item");
        this.itemInner.classList.add("grid-item-inner");
        this.itemOverlay.classList.add("grid-item-overlay");
        this.itemText.classList.add("grid-item-text");
        this.itemOverlay.textContent = "?";
        this.itemInner.dataset.index = i;
        this.itemOverlay.dataset.index = i;
        this.itemInner.dataset.clicked = false;
        this.gridContainer.appendChild(this.item);
        this.item.appendChild(this.itemInner);
        this.itemInner.appendChild(this.itemOverlay);
        this.itemInner.appendChild(this.itemText);
      }
      this.itemInner = document.querySelectorAll(".grid-item-inner");
    },

    addText() {
      for (let i = 0; i < this.itemInner.length; i++) {
        this.itemInner[i].children[1].textContent =
          this.letterArr[i].toUpperCase();
      }
    },

    removeOverlay() {
      this.itemInner.forEach((item) => {
        item.classList.remove("grid-item-flip");
        this.counter = 0;
      });
    },

    checkGuess() {
      const filteredItem = [...this.itemInner].filter((item) =>
        this.itemIndex.includes(item.dataset.index)
      );

      for (let i = 0; i < filteredItem.length; i++) {
        if (this.guessArr[0] === this.guessArr[1]) {
          filteredItem[i].dataset.clicked = false;
          filteredItem[i].dataset.found = "true";
          setTimeout(() => {
            filteredItem[i].children[1].style.background = "green";
          }, 500);
        }
        filteredItem[i].dataset.clicked = false;
      }
    },

    startTime() {
      this.start = window.performance.now();
    },

    checkEveryItem() {
      const isEveryItemFound = [...this.itemInner].every(
        (item) => item.dataset.found === "true"
      );

      if (isEveryItemFound) {
        setTimeout(() => {
          this.initializeEndModal();
          this.end = window.performance.now();
          this.time = this.end - this.start;
          this.getCurrentTime();
          this.getBestTime();
        }, 200);
      }
    },

    getCurrentTime() {
      const currentTime = document.querySelector(".time");
      if (!this.getLocalStorage()) {
        this.setLocalStorage(this.time);
      }
      if (this.getLocalStorage() > this.time) {
        this.setLocalStorage(this.time);
      }

      if (this.time > 60000) {
        const minutes = (this.time / 1000 / 60).toFixed(2).slice(0, 1);
        const seconds = (this.time / 1000 / 60).toFixed(2).slice(2);
        currentTime.textContent = `${minutes} minutes and ${seconds} seconds`;
      } else {
        currentTime.textContent = `${(this.time / 1000).toFixed(2)} seconds`;
      }
    },

    getBestTime() {
      const bestTime = document.querySelector(".best-time");
      const minutes = (this.getLocalStorage() / 1000 / 60)
        .toFixed(2)
        .slice(0, 1);
      const seconds = (this.getLocalStorage() / 1000 / 60).toFixed(2).slice(2);

      if (this.getLocalStorage() > 60000) {
        bestTime.textContent = `${minutes} minutes and ${seconds} seconds`;
      } else {
        bestTime.textContent = `${(this.getLocalStorage() / 1000).toFixed(
          2
        )} seconds`;
      }
    },

    setLocalStorage(n) {
      localStorage.setItem("best-time", n);
    },

    getLocalStorage() {
      return localStorage.getItem("best-time");
    },

    clickListener() {
      this.itemInner.forEach((item) =>
        item.addEventListener("click", () => {
          if (
            this.counter < 2 &&
            item.dataset.found !== "true" &&
            item.dataset.clicked === "false"
          ) {
            item.classList.add("grid-item-flip");
            item.dataset.clicked = true;
            this.guessArr.push(item.children[1].textContent);
            this.itemIndex.push(item.dataset.index);
            this.counter += 1;
          }
          if (this.counter >= 2) {
            this.checkGuess();
            this.checkEveryItem();
            setTimeout(() => {
              this.removeOverlay();
            }, 800);
            this.guessArr = [];
            this.itemIndex = [];
          }
        })
      );
    },
  };
  Game.initializeHelpModal();
  Game.utilities();
  Game.shuffleItems();
  Game.createGrid();
  Game.addText();
  Game.clickListener();
})();
