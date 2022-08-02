export class Footer {
  elem = document.createElement('footer');

  render = () => {
    this.elem.innerHTML = `
      <div class="wrapper footer__wrapper">
        <div>
          2022 <a href="https://github.com/svr-by" class="footer__link">svr-by</a>
        </div>
        <div>
          <a href="https://rs.school/js/">
            <img src="assets/img/rs_school_js.svg" alt="RSSchool"  class="footer__img">
          </a>
        </div>
      </div>
    `;
    document.body.append(this.elem);
  };
}
