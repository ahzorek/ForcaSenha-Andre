let hasActivated = false
const easterEgg = (ref, string) => {
  if (!hasActivated) {
    if (checkIfStringMatches(string)) {
      const drugelis = document.createElement('div')
      drugelis.classList.add('drugelis')
      drugelis.innerHTML = `
          <div class="flying">
            <div class="wingLeft">
              <div class="fly"></div>
              <div class="fly"></div>
            </div>
            <div class="wingRight">
              <div class="fly"></div>
              <div class="fly"></div>
            </div>
          </div>
        </div>
      `
      ref.appendChild(drugelis)
      hasActivated = true
    }
  }
}
export default easterEgg

function checkIfStringMatches(str) {
  if ((str.replace(/\s+/g, "").toLowerCase()).includes('socialbutterfly'))
    return true
}