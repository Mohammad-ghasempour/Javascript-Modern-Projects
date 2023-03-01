
const StorageCtrl = (()=>{
  
})()

const ItemCtrl = (() => {
  //Item constructor
  function Item(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure / state
  const data = {
    item: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookie", calories: 400 },
      // { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  //Public methods
  return {
    getItems: () => {
      return data.item;
    },
    logData: () => {
      return data;
    },
    addItem: (name, calories) => {
      let ID;
      if (data.item.length > 0) {
        ID = data.item[data.item.length - 1].id + 1;
      } else {
        ID = 0;
      }
      calories = parseInt(calories);
      newItem = new Item(ID, name, calories);
      data.item.push(newItem);
      return newItem;
    },
    getTotalCalories: () => {
      let total = 0;
      data.item.forEach((item) => {
        total += item.calories;
      });
      data.totalCalories = total;
      return data.totalCalories;
    },
    getItemById: (id) => {
      let found = null;
      data.item.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: (item) => {
      data.currentItem = item;
    },
    getCurrentItem: () => {
      return data.currentItem;
    },
    updateItem: (name, calories) => {
      let found = null;
      calories = parseInt(calories);

      data.item.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: (id)=>{
      const newList = data.item.filter((item)=>{
        return item.id !== id
      })
      data.item= newList;
    },
    clearAllItems: ()=>{
      data.item = [];
    }
  };
})();

//UI controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
  };
  return {
    populateItemLists: (items) => {
      let html = "";
      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: (item) => {
      document.querySelector(UISelectors.itemList).style.display = "block";
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    getSelectors: () => {
      return UISelectors;
    },
    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    updateListItem: (item) => {
      let itemLists = document.querySelectorAll(UISelectors.listItems);
      itemLists = Array.from(itemLists);

      itemLists.forEach((node) => {
        if (node.id.slice(-1) == item.id) {
          document.querySelector(
            `#item-${item.id}`
          ).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: (id)=>{
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();

    },
    removeAllListItems: ()=>{
      const listItems = document.querySelectorAll(UISelectors.listItems);
      listItems.forEach(item =>{
        item.remove();
      })
    }
  };
})();

//App controller
const App = ((ItemCtrl, UICtrl) => {
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", cancelEditMode);
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);
      document.querySelector(UISelectors.clearBtn).addEventListener("click" , clearAllItemsClick)
  };
  const itemAddSubmit = (e) => {
    const input = UICtrl.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      UICtrl.clearInput();
    }

    e.preventDefault();
  };
  const itemEditClick = (e) => {
    if (e.target.classList.contains("edit-item")) {
      const listId = e.target.parentNode.parentNode.id;
      const id = parseInt(listId.slice(-1));
      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };
  const itemUpdateSubmit = (e) => {
    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    UICtrl.updateListItem(updatedItem);
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();

    e.preventDefault();
  };
  const cancelEditMode = (e) => {
    UICtrl.clearEditState();
    e.preventDefault();
  };
  const itemDeleteSubmit = (e)=>{
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState()
   
    e.preventDefault()
  }
  const clearAllItemsClick = ()=>{
    ItemCtrl.clearAllItems();
    UICtrl.showTotalCalories(0);
    UICtrl.removeAllListItems();
    UICtrl.hideList();
  }

  //Public methods
  return {
    init: () => {
      UICtrl.clearEditState();
      //Fetch items from data structure
      const items = ItemCtrl.getItems();
      items.length === 0 ? UICtrl.hideList() : UICtrl.populateItemLists(items);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

//Initial App:
App.init();
