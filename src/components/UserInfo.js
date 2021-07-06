export class UserInfo {
  constructor({ nameElement, descriptionElement, avatarElement }) {
    this._nameElement = nameElement;
    this._descriptionElement = descriptionElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    }
  }

  setUserInfo = (name , description, avatar) => {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
    this._avatarElement.src = avatar;
  }
}
