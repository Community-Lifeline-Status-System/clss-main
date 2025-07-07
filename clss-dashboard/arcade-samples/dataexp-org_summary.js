/*
 * Arcade Expression: Organization Summary for CLSS Dashboard
 *
 * Retrieves organization data from a specified ArcGIS Online feature service and summarizes each organization,
 * including the count of related assessments. This expression is designed for use in the Organization List
 * element of the CLSS Dashboard, providing key organization attributes and assessment counts.
 *  
 * Output: FeatureSet with fields for GlobalID, IsDeleted, Organization, Description, Type, Role, and count_assessments.
 * Used In: Organization List Element. 
*/


var orgs = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com/'),
    '649091ebf4af4233902e975798d59ef9',
    2,
    [
        'Name',
        'Description',
        'HostID',
        'Role',
        'Type',
        'State',
        'County',
        'GlobalId',
        'IsDeleted'

    ],
    false
);

// Create empty array for features, feat object to populate array
var features = [];
var feat;

for (var org in orgs){
    var countAssessments = count(FeatureSetByRelationshipName(org, 'Assessment', ['OBJECTID'], false))
    feat = {
            attributes: {
                GlobalID: org.GlobalID,
                isDeleted: org.IsDeleted,
                Organization: org.Name,
                Description: org.Description,
                Type: DomainName(org, "Type"),
                Role: DomainName(org, "Role"),
                count_assessments: countAssessments,
            },
        };
    Push(features, feat);
}

var orgDict = {
    fields: [
        { name: 'GlobalID', type: 'esriFieldTypeString' },
        { name: 'IsDeleted', type: 'esriFieldTypeInteger' },
        { name: 'Organization', type: 'esriFieldTypeString' },
        { name: 'Description', type: 'esriFieldTypeString' },
        { name: 'Type', type: 'esriFieldTypeString' },
        { name: 'Role', type: 'esriFieldTypeString' },
        { name: 'count_assessments', type: 'esriFieldTypeInteger' },
    ],
    geometryType: '',
    features: features,
};

// Return dictionary cast as a feature set 
return FeatureSet(orgDict);
