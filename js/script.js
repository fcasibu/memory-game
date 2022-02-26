(() => {
  const Game = {
    init() {
      this.gridItem = document.querySelectorAll(".grid-item");
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
      ];
      this.counter = 0;
      this.guessArr = [];
      this.itemIndex = [];
      this.shuffledItems = [];
    },

    shuffleItems() {
      for (let i = this.letterArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i + 1);

        [this.letterArr[i], this.letterArr[j]] = [
          this.letterArr[j],
          this.letterArr[i],
        ];
      }

      this.shuffledItems.push(this.letterArr);
    },

    createOverlayAndTextContainer() {
      for (let i = 0; i < this.gridItem.length; i++) {
        this.itemOverlay = document.createElement("div");
        this.itemText = document.createElement("p");
        this.itemOverlay.classList.add("grid-item-overlay");
        this.itemText.classList.add("grid-item-text");
        this.gridItem[i].appendChild(this.itemOverlay);
        this.gridItem[i].appendChild(this.itemText);
        this.gridItem[i].dataset.clicked = false;
      }
      this.gridItemOverlay = document.querySelectorAll(".grid-item-overlay");
    },

    addText() {
      for (let i = 0; i < this.gridItem.length; i++) {
        this.gridItem[i].children[1].textContent = this.shuffledItems[0][i];
      }
    },

    removeOverlay() {
      this.gridItem.forEach((item) => {
        item.classList.remove("grid-item-flip");
        this.counter = 0;
      });
    },

    checkGuess() {
      const filteredItem = [...this.gridItem].filter((item) =>
        this.itemIndex.includes(item.dataset.index)
      );
      for (let i = 0; i < filteredItem.length; i++) {
        if (this.guessArr[0] === this.guessArr[1]) {
          filteredItem[i].dataset.clicked = false;
          filteredItem[i].dataset.found = "true";
          setTimeout(() => {
            filteredItem[i].style.background = "green";
          }, 500);
        }
        filteredItem[i].dataset.clicked = false;
      }
    },

    checkAllFound() {
      const isFound = [...this.gridItem].every(
        (item) => item.dataset.found === "true"
      );

      if (isFound) {
        setTimeout(() => {
          alert("good job!");
        }, 200);
      }
    },

    clickListener() {
      this.gridItem.forEach((item) =>
        item.addEventListener("click", () => {
          if (
            this.counter < 2 &&
            item.dataset.found !== "true" &&
            item.dataset.clicked === "false"
          ) {
            item.classList.add("grid-item-flip");
            this.guessArr.push(item.children[1].textContent);
            this.itemIndex.push(item.dataset.index);
            item.dataset.clicked = true;
            this.counter += 1;
          }
          if (this.counter >= 2) {
            this.checkGuess();
            this.checkAllFound();
            setTimeout(() => {
              this.removeOverlay();
            }, 500);
            this.guessArr = [];
            this.itemIndex = [];
          }
        })
      );
    },
  };
  Game.init();
  Game.shuffleItems();
  Game.createOverlayAndTextContainer();
  Game.addText();
  Game.clickListener();
})();
