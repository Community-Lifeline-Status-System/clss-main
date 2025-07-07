/*
 * Arcade Expression: Assessement Details for CLSS Dashboard
 * 
 * Retrieves and processes assessment data from a feature service.
 * 
 * Used In: Indicator elements for Indicators, the Lifeline Chart Element, the Indicator Table Element.
*/


// Retrieve the FeatureSet for the Assessments table 
var assessments = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com'), // Specify the portal
    '649091ebf4af4233902e975798d59ef9', // Item ID of the feature service
    3, // Layer index for the Assessments table
    ["GlobalID", "Name", "Content","IncidentID"], 
    false // Do not cache results
);

var incidents = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com'), // Specify the portal
    '649091ebf4af4233902e975798d59ef9', // Item ID of the feature service
    5, // Layer index for the Assessments table
    ["GlobalID", "Name"], 
    false // Do not cache results
);

var assessmentArray = [];

var lifelineMap = {
    "Safety___Security": "Safety & Security",
    "Food__Hydration__Shelter": "Food, Hydration & Shelter",
    "Health___Medical": "Health & Medical",
    "Water_Systems": "Water Systems",
    "Energy": "Energy",
    "Communications": "Communications",
    "Transportation": "Transportation",
    "Hazardous_Materials": "Hazardous Materials"
};

// Top level: loop through Assessments
for (var assessment in assessments) {
    var content = assessment.Content;
    var parsedContent = Dictionary(content);


    var incidentId = assessment.IncidentID;
    var incident_Name = "";
 
    // Lookup Incident Name using matching GlobalID
        if (!IsEmpty(incidentId)) {
            var matchedIncident = First(Filter(incidents, "GlobalID = @incidentId"));
        if (!IsEmpty(matchedIncident)) {
            incident_Name = matchedIncident.Name;
           }
        }

    // Second level: loop through Lifeline
    for (var k in parsedContent) {
        var key = Text(k); // Convert the index to a string
        var lifeline = parsedContent[key];
        var componentStatuses = lifeline["componentStatuses"];

        // Iterate through each component status
        for (var j in componentStatuses) {
            var componentStatusArray = Dictionary(componentStatuses[j]);
            var indicators = componentStatusArray["indicatorStatuses"];

            // Third Level, loop through Lifeline:componentStatuses:indicators
            if (!IsEmpty(indicators)) {
                for (var i in indicators) {
                    // Access the properties of each indicator
                    var indicator = indicators[i];
                    var indicatorComments = indicator["comments"]; // Access comments array
                    var concatenatedComments = ""; // Initialize empty string for concatenated comments
                    var commentCount = 0; // Initialize comment count

                    // Check if comments exist
                    if (!IsEmpty(indicatorComments)) {
                        commentCount = Count(indicatorComments); // Count the number of comments
                        
                        for (var c in indicatorComments) {
                            var comment = indicatorComments[c];
                            // Concatenate comments with a separator
                            concatenatedComments += "[" + comment["author"] + "]: " + comment["comment"] + " ";
                        }
                    }
                    // Check if linkedItems exist
                    var indicatorLinkedData = indicator["linkedItems"]; // Access comments array
                    var linkedData_Name = null;
                    var linkedData_URL = null;
                    var linkedData_Notes = null;
                    var linkedData_Type = null;

                    if (!IsEmpty(indicatorLinkedData) && Count(indicatorLinkedData) > 0) {
                        var firstItem = indicatorLinkedData[0];
                        if (HasKey(firstItem, "name")) {
                            linkedData_Name = firstItem["name"];
                        }
                        if (HasKey(firstItem, "url")) {
                            linkedData_URL = firstItem["url"];
                        }
                        if (HasKey(firstItem, "notes")) {
                            linkedData_Notes = firstItem["notes"];
                        }
                        if (HasKey(firstItem, "itemType")) {
                            linkedData_Type = firstItem["itemType"];
                        }
                    }

                    if (HasKey(indicator, "updatedDate")) {
                        var indicatorDate = indicator["updatedDate"];
                        indicatorDate = Text(indicatorDate, 'yyyy/MM/dd')
                    }

                    var rawName = lifeline["lifelineName"];
                    if (HasKey(lifelineMap, rawName)) {
                        var readableName = lifelineMap[rawName];
                    }

                    var rawComponentName = componentStatusArray["componentName"];

                    // Stepwise replacements
                    var formattedComponentName = Replace(rawComponentName, "____", " & ");
                    formattedComponentName = Replace(formattedComponentName, "__", ", ");
                    formattedComponentName = Replace(formattedComponentName, "_", " ");

                    // Create feature with concatenated comments and comment count
                    var assessmentContent = {
                        attributes: {
                            combinedKey: assessment.Name + '_' + lifeline["lifelineName"],
                            lifelineName: readableName,
                            assessmentId: assessment.GlobalId,
                            assessment: assessment.Name,
                            incidentId: assessment.IncidentID,
                            incidentName: incident_Name,
                            score: lifeline["score"],
                            color: lifeline["color"],
                            overriddenColor: lifeline["overriddenColor"],
                            isOverridden: lifeline["isOverridden"],
                            overriddenScore: lifeline["overriddenScore"],
                            overriddenBy: lifeline["overriddenBy"],
                            overriddenComment: lifeline["overriddenComment"],
                            componentName: formattedComponentName,
                            indicator: indicator['indicator'],
                            indicatorStatus: indicator['status'],
                            indicatorDate: indicatorDate,
                            Comments: concatenatedComments, // Concatenated comments
                            CommentCount: commentCount, // Total number of comments,
                            linkedData_Name: linkedData_Name,
                            linkedData_URL: linkedData_URL,
                            linkedData_Notes: linkedData_Notes,
                            linkedData_Type: linkedData_Type
                        }
                    };
                    Push(assessmentArray, assessmentContent);
                }
            }
        }
    }
}

// Define output fields
var assessContentDict = {
    fields: [
        { name: 'combinedKey', type: 'esriFieldTypeString' },
        { name: 'lifelineName', type: 'esriFieldTypeString' },
        { name: 'assessment', type: 'esriFieldTypeString' },
        { name: 'assessmentId', type: 'esriFieldTypeString' },
        { name: 'incidentId', type: 'esriFieldTypeGUID' },
        { name: 'incidentName', type: 'esriFieldTypeString' },          
        { name: 'score', type: 'esriFieldTypeString' },
        { name: 'color', type: 'esriFieldTypeString' },
        { name: 'overriddenColor', type: 'esriFieldTypeString' },
        { name: 'isOverridden', type: 'esriFieldTypeString' },
        { name: 'overriddenScore', type: 'esriFieldTypeString' },
        { name: 'overriddenBy', type: 'esriFieldTypeString' },
        { name: 'overriddenComment', type: 'esriFieldTypeString' },
        { name: 'componentName', type: 'esriFieldTypeString' },
        { name: 'indicator', type: 'esriFieldTypeString' },
        { name: 'indicatorStatus', type: 'esriFieldTypeString' },
        { name: 'indicatorDate', type: 'esriFieldTypeDate' },
        { name: 'Comments', type: 'esriFieldTypeString' }, 
        { name: 'CommentCount', type: 'esriFieldTypeInteger' }, 
        { name: 'linkedData_Name', type: 'esriFieldTypeString' },
        { name: 'linkedData_URL', type: 'esriFieldTypeString' },
        { name: 'linkedData_Notes', type: 'esriFieldTypeString' },
        { name: 'linkedData_Type', type: 'esriFieldTypeString' }        

    ],
    geometryType: '',
    features: assessmentArray,
};

// Return dictionary cast as a feature set 
return FeatureSet(assessContentDict);