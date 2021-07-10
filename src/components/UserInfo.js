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

  setUserAvatar = (avatar) => {
    this._avatarElement.src = avatar;
  }

  setUserInfo = (name , description) => {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }

  setUserInitialInfo = (name , description, avatar) => {
    this.setUserAvatar(avatar);
    this.setUserInfo(name , description);
  }
}
