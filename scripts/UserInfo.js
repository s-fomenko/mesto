export class UserInfo {
  constructor({ nameElement, descriptionElement }) {
    this._nameElement = nameElement;
    this._descriptionElement = descriptionElement;
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    }
  }

  setUserInfo = (name , description) => {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}
