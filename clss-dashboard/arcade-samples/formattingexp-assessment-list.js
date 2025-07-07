/*
 * Arcade Expression: Assessment List Formatting
 * 
 * Used In: Assessment List Element
*/


var icon = IIf($datapoint.Hazard == "Flood" || $datapoint.Hazard == "Flooding", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/USAR/USAR_Search/INCDNT-USAR--_WHITE__SOLID__DETAIL_Hazard--Flood_256x256.png",
IIf($datapoint.Hazard == "Ice", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Public_Alert/Public_Alerts_and_Warnings/Ice-Storm-Warning_256x256.png",
IIf($datapoint.Hazard == "Earthquake", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Natural_Hazards/NATHAZ/HAZARD_NATHAZ_WHITE__SOLID-_DETAIL_Hazard--Earthquake_256x256.png",
IIf($datapoint.Hazard == "Wildfire" || $datapoint.Hazard == "Fire"|| $datapoint.Hazard == "Wildland Fire", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/USAR/USAR_Search/INCDNT-USAR--_WHITE__SOLID__DETAIL_Hazard--Fire-Other_256x256.png",
IIf($datapoint.Hazard == "Hurricane", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Natural_Hazards/NATHAZ/HAZARD_NATHAZ_WHITE__SOLID-_DETAIL_Hazard--Hurricane_256x256.png",
"https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Human_Caused_Hazards/MANHAZ/HAZARD_NATHAZ_WHITE__SOLID-_DETAIL_Hazard--Other_256x256.png")))))

var complete = Iif($datapoint.IsComplete=="Complete","Visible","none");
var inprogress = Iif($datapoint.IsComplete=="Not Complete","Visible","none");

return {
  textColor: '',
  backgroundColor: '',
  separatorColor:'',
  selectionColor: '',
  selectionTextColor: '',
  attributes: {
    hazardIcon: icon,
    complete: complete,
    inprogress:inprogress
  }
}