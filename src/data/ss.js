.burger-icon {
    width: 30px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    z-index: 1100;
    position: relative;
  }

  .line {
    height: 3px;
    background-color: rgb(255, 255, 255);
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 36px;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
    z-index: 1100;
  }

  .close-icon {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 1100;
  }

  .close-icon span {
    position: absolute;
    height: 4px;
    width: 100%;
    background-color: rgb(255, 255, 255);
    top: 50%;
    left: 0;
    transform-origin: center;
    transition: 0.3s ease;
  }

  .close-icon span:first-child {
    transform: rotate(45deg);
  }

  .close-icon span:last-child {
    transform: rotate(-45deg);
  }
