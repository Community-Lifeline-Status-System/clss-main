/*
 * Arcade Expression: Related Assessments for CLSS Dashboard
 *
 * This Arcade expression retrieves assessments and their related incidents, hazards, and organizations  
 * from a feature service, processes the data, and returns it in a structured format.
 *
 * Used In: List (Assessments-Relate)** List Element, Assessment Indicators, Pie_Assessments Per incidents Element. 
*/

// Retrieve the FeatureSet for the Assessments table
var assessments = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com'), // Specify the portal
    '649091ebf4af4233902e975798d59ef9', // Item ID of the feature service
    3, // Layer index for the Assessments table
    ['*'], // Return all fields
    false // Do not cache results
);

var incidents = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com'), // Specify the portal
    '649091ebf4af4233902e975798d59ef9', // Item ID of the feature service
    5, // Layer index for the Assessments table
    ['*'], // Return all fields
    false // Do not cache results
);

// Define an empty array to store the final results
var features = [];
var IsComplete = null;

for (var assessment in assessments) {
    var incidentName = null;
    var orgName = null;
    var incidentID = assessment['IncidentID']
    IsComplete = Iif(!IsEmpty(assessment.CompletedDate), "Complete", "Not Complete");

    // INCIDENT LOOKUP (by ID match)
    if (!IsEmpty(assessment.IncidentID)) {
        var hazardName = null
        var incidentMatch = First(Filter(incidents, 'GlobalID = @incidentID'));
        if (incidentMatch != null) {
            incidentName = incidentMatch.Name;
        }
        //get hazard based on incident lookup
        var hazard = First(FeatureSetByRelationshipName(incidentMatch, 'Hazard', ['Name'], false));
        if (hazard != null) {
            hazardName = hazard.Name
        }       
    }

    var organization = First(FeatureSetByRelationshipName(assessment, 'Organization', ['Name'], false));
    if (organization != null) {
        orgName = organization.Name;
    }

    var ft = {
        "attributes": {
            "OBJECTID": assessment.OBJECTID,
            "Name": assessment.Name,
            "Description": assessment.Description,
            "CompletedDate": assessment.CompletedDate,
            "IsComplete": IsComplete,
            "IsDeleted": assessment.IsDeleted,
            "Creator": assessment.Creator,
            "CreationDate": assessment.CreationDate,
            "Editor": assessment.Editor,
            "EditDate": assessment.EditDate,
            "Incident": incidentName,
            "IncidentID":assessment.IncidentID,
            "Hazard": hazardName,
            "Organization": orgName
        }
    };
    Push(features, ft);
}

// Define the FeatureSet schema
var featureSetDefinition = {
    "geometryType": null, 
    "fields": [
        {"name": "OBJECTID", "type": "esriFieldTypeOID"},
        {"name": "Name", "type": "esriFieldTypeString"},
        {"name": "Description", "type": "esriFieldTypeString"},
        {"name": "IsCompleted", "type": "esriFieldTypeSmallInteger"},
        {"name": "CompletedDate", "type": "esriFieldTypeDate"},
        {"name": "IsComplete", "type": "esriFieldTypeString"},
        {"name": "ExpirationDate", "type": "esriFieldTypeDate"},
        {"name": "IsDeleted", "type": "esriFieldTypeSmallInteger"},
        {"name": "Creator", "type": "esriFieldTypeString"},
        {"name": "CreationDate", "type": "esriFieldTypeDate"},
        {"name": "Editor", "type": "esriFieldTypeString"},
        {"name": "EditDate", "type": "esriFieldTypeDate"},
        {"name": "Incident", "type": "esriFieldTypeString"},
        {"name": "IncidentID", "type": "esriFieldTypeGUID"},
        {"name": "Hazard", "type": "esriFieldTypeString"},        
        {"name": "Organization", "type": "esriFieldTypeString"}

    ],
    "features": features
};

// Return the array of features in a FeatureSet-like structure
return FeatureSet(featureSetDefinition);