import itemsMeta from "../data/meta.json" with { type: "json" };

window.onload = () => {

  const dropDownListContainers = document.querySelectorAll(".drop-down-list-container");
  const dropDownLists = document.querySelectorAll(".drop-down-list");

  const setUpImageSrc = (selectItemImage, selectItemSrc) => {
    selectItemImage.src = "resources/images/items/" + selectItemSrc;
  }

  const openImageSelectItem = (selectItemImage) => {
    selectItemImage.style.display = "block";
  }

  const closeImageSelectItem = (selectItemImage) => {
    selectItemImage.style.display = "none";
  }

  const openDropdownList = (event, startButton, list, selectItemImage) => {
    event.stopPropagation();
    closeDropdownLists();
    list.classList.add("open");
    startButton.classList.remove("start-button-selected");
    closeImageSelectItem(selectItemImage);
  }

  const closeDropdownLists = () => {

    dropDownLists.forEach((dropDownList) => {
      dropDownList.classList.remove("open");
    });

  }

  const selectProcess = (event, startButton, selectItemImage) => {

    const selectButton = event.target.closest(".drop-down-list-item");

    if (!selectButton) {
      return;
    }

    const selectItemName = selectButton.getAttribute("data-name");
    const selectItemSrc = selectButton.getAttribute("data-imageSrc");
    startButton.textContent = selectItemName;
    startButton.classList.add("start-button-selected");
    setUpImageSrc(selectItemImage,selectItemSrc);
    openImageSelectItem(selectItemImage);
    closeDropdownLists();
  }

  const createListButton = (item) => {
    const button = document.createElement("div");
    button.textContent = item.name;
    button.classList.add("drop-down-list-item");
    button.setAttribute("data-id",item.id);
    button.setAttribute("data-name",item.name);
    button.setAttribute("data-imageSrc",item.imageSrc);
    return button;
  }

  const initDropDownLists = (itemsMeta) => {
    dropDownListContainers.forEach((dropDownListContainer) => {
      const startButton = dropDownListContainer.querySelector(".start-button");
      const image = dropDownListContainer.querySelector(".image-select-item");
      const list = dropDownListContainer.querySelector(".drop-down-list");
      itemsMeta.forEach((item) => {
        const button = createListButton(item);
        list.appendChild(button);
      });
      list.addEventListener("click", (event) => {
        selectProcess(event, startButton, image);
      });
      startButton.addEventListener("click", (event) => {
        openDropdownList(event, startButton, list, image);
      });
    });
  }
  
  initDropDownLists(itemsMeta);
  document.addEventListener("click", closeDropdownLists);
};
