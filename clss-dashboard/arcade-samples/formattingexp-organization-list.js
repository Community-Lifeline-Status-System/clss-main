/*
 * Arcade Expression: Organization List Formatting
 * 
 * Used In: List (Organizations) Element
*/

var bgColor = Iif(DomainName($datapoint, "Role")=='Host','#DDF1FE','')
var txtColor = Iif(DomainName($datapoint, "Role")=='Host','red','')

return {
  textColor: '',
  backgroundColor: '',
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
  attributes: {
    roleColor: txtColor
  }
}