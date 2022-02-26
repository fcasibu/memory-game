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

    createGrid(n) {
      this.gridContainer = document.createElement("div");
      this.gridContainer.classList.add("grid-container");
      document.body.prepend(this.gridContainer);
      for (let i = 0; i < n; i++) {
        this.item = document.createElement("div");
        this.itemOverlay = document.createElement("div");
        this.itemText = document.createElement("p");
        this.item.classList.add("grid-item");
        this.itemOverlay.classList.add("grid-item-overlay");
        this.itemText.classList.add("grid-item-text");
        this.item.dataset.index = i;
        this.item.dataset.clicked = false;
        this.gridContainer.appendChild(this.item);
        this.item.appendChild(this.itemOverlay);
        this.item.appendChild(this.itemText);
      }
      this.gridItem = document.querySelectorAll(".grid-item");
    },

    addText() {
      for (let i = 0; i < this.gridItem.length; i++) {
        this.gridItem[i].children[1].textContent =
          this.shuffledItems[0][i].toUpperCase();
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
      console.log([...this.gridItem]);
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
  Game.utilities();
  Game.shuffleItems();
  Game.createGrid(24);
  Game.addText();
  Game.clickListener();
})();
