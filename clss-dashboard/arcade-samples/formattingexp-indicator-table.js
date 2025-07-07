/*
 * Arcade Expression: Incidator Table Formatting
 * 
 * Used In: Indicator Table (assessment-content) 
*/

// Define the color logic for indicatorStatus
var indicatorBackgroundColor = IIf($datapoint.indicatorStatus == 'Minimal / No Impact', '#5e9c42', IIf($datapoint.indicatorStatus == 'Significant Impact', '#C52038',IIf($datapoint.indicatorStatus == 'Moderate Impact', '#FBBA16', '#919395' // Default to grey
    )));
var indicatorTextColor = IIf($datapoint.indicatorStatus == 'Significant Impact', 'White','Black');

var llIcon = IIf($datapoint.lifelineName=="Communications","Communications",
  IIf($datapoint.lifelineName=="Energy","Energy",
  IIf($datapoint.lifelineName=="Safety & Security","Safety_Security",
  IIf($datapoint.lifelineName=="Food, Hydration, Shelter","Food_Water_Shelter",
  IIf($datapoint.lifelineName=="Communications","Communications",
  IIf($datapoint.lifelineName=="Hazardous Materials","HazMat",
  IIf($datapoint.lifelineName=="Transportation","Transportation",
  IIf($datapoint.lifelineName=="Water Systems","Water",
  IIf($datapoint.lifelineName=="Health & Medical","Health_Medical",'')))))))))

return {
  cells: {
    lifelineName: {
      displayText : $datapoint.lifelineName,
      textColor: '',
      backgroundColor: '',
      textAlign: 'left',
      iconName: llIcon,
      iconAlign: '',
      iconColor: '',
      iconOutlineColor: ''
    },
		
    assessment: {
      displayText : $datapoint.assessment,
      textColor: '',
      backgroundColor: '',
      textAlign: 'left',
      iconName: '',
      iconAlign: '',
      iconColor: '',
      iconOutlineColor: ''
    },
		
    componentName: {
      displayText : $datapoint.componentName,
      textColor: '',
      backgroundColor: '',
      textAlign: 'left',
      iconName: '',
      iconAlign: '',
      iconColor: '',
      iconOutlineColor: ''
    },
		 
    indicator: {
      displayText : $datapoint.indicator,
      textColor: '',
      backgroundColor: '',
      textAlign: 'left',
      iconName: '',
      iconAlign: '',
      iconColor: '',
      iconOutlineColor: ''
    },
		
    indicatorStatus: {
      displayText : $datapoint.indicatorStatus,
      textColor: indicatorTextColor,
      backgroundColor: indicatorBackgroundColor,
      textAlign: 'left',
      iconName: '',
      iconAlign: '',
      iconColor: '',
      iconOutlineColor: ''
    },
linkedData_Notes: {
  displayText: IIf(
    IsEmpty($datapoint.linkedData_URL), 
    '', 
    '<a href="' + $datapoint.linkedData_URL + '" target="_blank">' +
      IIf(
        IsEmpty($datapoint.linkedData_Notes), 
        'View Linked Data', 
        $datapoint.linkedData_Notes
      ) +
    '</a>'
  ),
  textColor: '',
  backgroundColor: '',
  textAlign: 'left',
  iconName: 'link',
  iconAlign: 'left',
  iconColor: '',
  iconOutlineColor: ''
},
  }
}