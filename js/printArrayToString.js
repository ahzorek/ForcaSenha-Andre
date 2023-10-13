//formata a array em uma string, mas (diferentemente do metodo .toString()) aceita parametros para formatação
//param1 Array: arr (unico obrigatório) - a array que vai ser formatada
//param2 String: spacer(separador) - é a string que vai ser usada para separar is itens da array, default (se null, por ex) pra ', ' (vírgula e espaço)
//param3 Boolean: isReverse - formata a string de tras para frente, default false
function printArrayToString(arr, spacer = null, isReverse = false) {
  //principa check, verifica se param arr foi atribuido e é de fato uma array
  if (!arr || !(Array.isArray(arr))) {
    console.error('Parâmetros foram passados indevidamente')
    if (!arr) { console.error('Param1: Não foi atribuida a Array') }
    if (!(Array.isArray(arr))) { console.error('Param1: Parâmetro atribuído não é do tipo Array') }
    return
  }
  // verifica se spacer (separador) passado não é null, undefined ou string vazia
  // objetivo é em caso de undefined ou objeto diferente de string, manter a string padrao, mas alertar o usuario
  // em caso de null considera-se que o usuario optou por passar o param como nulo para acessar o terceiro param
  // entao nao retorna erro ou warning, apenas formata tambem com a string padrao ', '
  if ((spacer === undefined) || (spacer === null) || (spacer.length === 0)) {
    if (spacer !== null) {
      console.warn('Param2: spacer atribuído não é do tipo String ou esta vazio. Será usado ", "')
    }
    spacer = ', '
  }

  //se isReverse é true, inverte a array com metodo reverse()
  if (isReverse) arr = arr.reverse()

  //inicializa a string de saida como string
  let stringFormatted = ''

  //itera por todos os iten da array e interpola, 'conteudo anterior' + 'item' + 'separador'
  // ou se for ultimo item, nao adiciona separador
  for (let i = 0; i < arr.length; i++) {
    if (i == (arr.length - 2)) {
      stringFormatted = stringFormatted + arr[i] + ' e '
    }
    else if (i !== (arr.length - 1)) {
      stringFormatted = stringFormatted + arr[i] + spacer
    }
    else stringFormatted = stringFormatted + arr[i]
  }

  return stringFormatted
}

export default printArrayToString