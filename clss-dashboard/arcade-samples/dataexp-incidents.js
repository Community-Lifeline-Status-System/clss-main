/*
 * Arcade Expression: Incidents with Related Hazards for Dashboard List
 * 
 * Retrieves incidents from the "Assessments" table and their related hazards.
 * 
 * Output: FeatureSet with fields for Name, Description, StartDate, EndDate, Hazard, and CountAssessments.
 * Used In: Incident List Element. 
*/

// Retrieve the FeatureSet for the Assessments table
var incidents = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com'), 
    '649091ebf4af4233902e975798d59ef9', 
    5, 
    ["GlobalID","HazardID", "Name", "Description","StartDate","EndDate"],
    false
);

var incidentContent = [];
var incidentArray = [];
// Top level: loop through Assessments
for (var incident in incidents) {
    var hazard = First(FeatureSetByRelationshipName(incident, 'Hazard', ['*'], false));
    console('hazard: ',hazard.Name)
    // Create feature
    incidentContent = {
        attributes: {
            Hazard: hazard.Name,
            Name: incident.Name,
            Description: incident.Description,
            StartDate: incident.StartDate,
            EndDate: incident.EndDate
        }
    };
    Push(incidentArray, incidentContent);
    Console('Incident Content:   ', incidentContent)
    }

var incidentContentDict = {
    fields: [
    { name: 'Name', type: 'esriFieldTypeString' },
    { name: 'Description', type: 'esriFieldTypeString' },
    { name: 'StartDate', type: 'esriFieldTypeDate' },
    { name: 'EndDate', type: 'esriFieldTypeDate' },
    { name: 'Hazard', 'type': 'esriFieldTypeString'},
    { name: 'CountAssessments', type: 'esriFieldTypeInteger' }],
    geometryType: '',
    features: incidentArray,
};

// Return dictionary cast as a feature set 
return FeatureSet(incidentContentDict);