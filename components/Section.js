class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem() {
    this._items.forEach((item) => {
      //call the rendere and pass the item as argument
      this._renderer(item);
    });
  }
  addItem(item) {
    this._container.append(item);
  }
}

export default Section;
