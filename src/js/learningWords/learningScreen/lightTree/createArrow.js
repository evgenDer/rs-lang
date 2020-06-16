const arrow = ` width="14px" height="35px" viewBox="0 0 14 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Master-items-DT" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<g id="•-Master-Links/Next-or-previous-card-cosmos" transform="translate(-16.000000, -5.000000)" fill-rule="nonzero" fill="#5B7195">
<g id="Arrow-next" transform="translate(23.000000, 22.500000) rotate(90.000000) translate(-23.000000, -22.500000) translate(5.500000, 15.000000)">
<path d="M11.1503596,5.52915704 C10.2834241,6.63645852 10.2830028,8.3630033 11.1503596,9.47084296 L23.0702747,24.695666 C23.333278,25.0315894 23.8310204,25.0998567 24.1820134,24.8481452 C24.5330065,24.5964338 24.6043363,24.1200616 24.341333,23.7841382 L12.421418,8.55931519 C11.9771384,7.991855 11.9773786,7.00783828 12.421418,6.44068481 L24.341333,-8.78413819 C24.6043363,-9.12006161 24.5330065,-9.5964338 24.1820134,-9.84814524 C23.8310204,-10.0998567 23.333278,-10.0315894 23.0702747,-9.69566596 L11.1503596,5.52915704 Z" id="Arrow-Back" transform="translate(17.500000, 7.500000) rotate(90.000000) translate(-17.500000, -7.500000) "></path></g></g></g></svg>`


export default function createArrow(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML('beforeend', `
  <svg slot='leftArrow' class='arrowSvg left' ${arrow}
  <svg slot='rightArrow' class='arrowSvg right' ${arrow}`)
}
