# Technical Guide: Configuring ArcGIS Dashboards with CLSS Data

This guide provides step-by-step instructions on using **ArcGIS Dashboards** to visualize and interact with **Community Lifeline Status System (CLSS)** data. You'll learn how to iterate through assessment data, access related tables, and configure Arcade expressions for dynamic and meaningful insights.

![image](https://github.com/user-attachments/assets/d637caa4-f1de-4906-8976-a9e11b0cf976)

---

## Table of Contents

1. [Introduction to CLSS Data in ArcGIS](#introduction-to-clss-data-in-arcgis)
2. [Why Use Arcade?](#why-use-arcade)
3. [Arcade Expression Reference](#arcade-expression-reference)
4. [Understanding the Data Structure](#understanding-the-data-structure)
5. [Using Arcade Expressions](#using-arcade-expressions)
6. [Example Configurations](#example-configurations)
7. [Tips for Dashboard Design](#tips-for-dashboard-design)
8. [Appendix: Overview of the CLSS Feature Service Structure](#appendix-overview-of-the-clss-feature-service-structure)
---

## Introduction to CLSS Data in ArcGIS

The **Community Lifeline Status System (CLSS) Feature Service** contains the feature layers and related tables that support storing information on incident-based assessments at the indicator, component, and lifeline levels. 

This guide is designed for users with experience configuring ArcGIS Dashboards to effectively work with relational CLSS data and embedded JSON objects.

---

### Why Use Arcade?

Arcade expressions are critical for:
- Parsing JSON fields to extract meaningful data.
- Seamlessly integrating related table data and coded domain values.

Using Arcade, you can enhance the interactivity and insights offered by dashboards, particularly when dealing with nested data structures.

---

## Arcade Expression Reference
This repo contains the Arcade expressions used in the CLSS Dashboard.

**Data Expressions**
| File | Used In |
|------|---------|
| [dataexp-assessment_related.js](./arcade-samples/dataexp-assessment_related.js) | - List Element (Assessments-Relate)<br>- Assessment Indicators<br>- Pie: Assessments Per Incident |
| [dataexp-assessment-content-details.js](./arcade-samples/dataexp-assessment-content-details.js) | - Indicator Elements<br>- Lifeline Chart Element<br>- Indicator Table Element |
| [dataexp-org_summary.js](./arcade-samples/dataexp-org_summary.js) | - Organization List Element |
| [dataexp-incidents.js](./arcade-samples/dataexp-incidents.js) | - Incident List Element |

**Formatting Expressions:**
| File | Used In |
|------|---------|
| [formattingexp-indicator-table.js](./arcade-samples/formattingexp-indicator-table.js) | Indicator Table (assessment-content) |
| [formattingexp-organization-list.js](./arcade-samples/formattingexp-organization-list.js) | List (Organizations) Element |
| [formattingexp-assessment-list.js](./arcade-samples/formattingexp-assessment-list.js) | Assessment List |


## Understanding the Data Structure

### Example Assessment Table Structure

The `Content` attribute in the Assessment table stores JSON-encoded data. Below is a sample structure:

```json
{
  "id": "12345",
  "Name": "Sample Assessment",
  "Content": {
    "1": {
      "lifelineName": "Safety & Security",
      "score": 4,
      "componentStatuses": [
        {
          "componentName": "Fire Services",
          "indictors": [
            {
              "indicator": "Unsafe conditions for Fire response",
              "status": "Significant Impact",
              "comments": [
                {
                  "author": "Admin",
                  "comment": "Unsafe conditions for Fire First Responders.",
                  "datetime": 1724098227083
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```
Key fields include:

- Content: Contains JSON-encoded data, which needs parsing.
- componentStatuses: Array of component details with indicators.

## Using Arcade Expressions
### Iterating Through Assessment Data
Arcade expressions can parse the JSON Content field to access nested data.

```javascript
// Access the Assessment table
var assessments = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com'),
    '92a0d44229bf4e24b1f0dbe1da1d7b1b',
    1,
    ["GlobalID", "Name", "Content"],
    false
);

var assessmentArray = [];
for (var assessment in assessments) {
    var content = Dictionary(assessment.Content);
    for (var key in content) {
        var lifeline = content[key];
        var componentStatuses = lifeline["componentStatuses"];
        for (var component in componentStatuses) {
            var indicators = componentStatuses[component]["indictors"];
            for (var indicator in indicators) {
                Push(assessmentArray, {
                    indicator: indicators[indicator]["indicator"],
                    status: indicators[indicator]["status"]
                });
            }
        }
    }
}
return assessmentArray;
```
[See the full Arcade expression for assessment data here.](./arcade-samples/dataexp-assessment-content-details.js)

## Accessing Related Tables
Arcade supports combining data from related tables. For example, accessing the Comments field within indicators:


```javascript
var comments = "";
var commentCount = 0;
for (var comment in indicator["comments"]) {
    comments += "[" + comment["author"] + "]: " + comment["comment"] + "\n";
    commentCount += 1;
}
```
This concatenates all comments into a single field and calculates the total number of comments.

---


## Example Configurations
### Dynamic Hazard Indicators
The CLSS Dashboard contains a list of assessments that dynamically displays the hazard type and assessment status based on the data returned to it by the arcade data expression.

[See the full Arcade expression for assessment-related data here.](./arcade-samples/dataexp-assessment_related.js)

The sample arcade formatting expression code below provides an example of how to effectively visualize data on CLSS assessments: 

```javascript
var icon = IIf($datapoint.Hazard == "Flood" || $datapoint.Hazard == "Flooding", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/USAR/USAR_Search/INCDNT-USAR--_WHITE__SOLID__DETAIL_Hazard--Flood_256x256.png",
IIf($datapoint.Hazard == "Ice", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Public_Alert/Public_Alerts_and_Warnings/Ice-Storm-Warning_256x256.png",
IIf($datapoint.Hazard == "Earthquake", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Natural_Hazards/NATHAZ/HAZARD_NATHAZ_WHITE__SOLID-_DETAIL_Hazard--Earthquake_256x256.png",
IIf($datapoint.Hazard == "Wildfire" || $datapoint.Hazard == "Fire"|| $datapoint.Hazard == "Wildland Fire", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/USAR/USAR_Search/INCDNT-USAR--_WHITE__SOLID__DETAIL_Hazard--Fire-Other_256x256.png",
IIf($datapoint.Hazard == "Hurricane", "https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Natural_Hazards/NATHAZ/HAZARD_NATHAZ_WHITE__SOLID-_DETAIL_Hazard--Hurricane_256x256.png",
"https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/Human_Caused_Hazards/MANHAZ/HAZARD_NATHAZ_WHITE__SOLID-_DETAIL_Hazard--Other_256x256.png")))))

var complete = Iif($datapoint.IsComplete=="Complete","Visible","none");
var inprogress = Iif($datapoint.IsComplete=="Not Complete","Visible","none");

return {
  attributes: {
    hazardIcon: icon,
    complete: complete,
    inprogress:inprogress
  }
}
```

## Example Configurations
### Dynamic Lifeline Status Indicators
You can visualize lifeline status using standard iconography from FEMA's lifeline toolkit, for example: Significantly Impacted Lifelines are rendered as the Lifeline icon with a red halo, Moderatly Impacted Lifelines with a Yellow halo, No Impacts with a Green halo, and unknown impacts with a Gray halo.

This example uses lifeline icons provided by NAPSG's Symbology Library, which are accessible via web-accessible links. Using arcade to perform advanced formatting of a list element, you can render the lifeline icons according to the stored status values by dynamically generating a URL for each lifeline.

First, use a nested conditional statement to return the 'plain text' color matching a hex-code color stored in the CLSS assessment table:
```javascript
var color = Iif($datapoint.color=="#FBBA16","yellow",
  IIf($datapoint.color=="#5E9C42", "green", 
  IIf($datapoint.color=="#C52038", "red", 
  IIf($datapoint.color=="#919395", "gray","gray"))));
```
Then, based on the lifeline name variable, return the associated lifeline folder name: 
```javascript
var lifelineBase = Iif($datapoint.lifelineName=="Safety & Security","Safety_and_Security/safety-and-security",
    Iif($datapoint.lifelineName=="Communications","Communications/communications",
    Iif($datapoint.lifelineName=="Energy","Energy/energy-power-fuel",
    Iif($datapoint.lifelineName=="Food, Hydration, Shelter","Food_Water_Shelter/food-water-shelter",
    Iif($datapoint.lifelineName=="Hazardous Materials","Hazardous_Materials/hazardous-materials",
    Iif($datapoint.lifelineName=="Health & Medical","Health_and_Medical/health-and-medical",
    Iif($datapoint.lifelineName=="Safety & Security","Safety_and_Security/safety-and-security",
    Iif($datapoint.lifelineName=="Transportation","Transportation/transportation",
    Iif($datapoint.lifelineName=="Water Systems","Food_Water_Shelter/food-water-shelter_water","")))))))))
```
Finally, assemble the full url to the NAPSG icon and pass this as a variable to the list element:
```javascript

var llIcon = Iif($datapoint.lifelineName=="Water Systems","https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/lifelines/"+lifelineBase+"-"+color+"-halo_256x256.png","https://napsg-web.s3.amazonaws.com/symbology/data/PNG9/lifelines/"+lifelineBase+"-with-label-"+color+"-halo_256x256.png")

return {
  textColor: '',
  backgroundColor: '',
  separatorColor:'white',
  selectionColor: '',
  selectionTextColor: '',
  attributes: {
    iconUrl: llIcon
  }
}
```
### Return Related items and Domain names
The code sample below shows how, for the Organization list element, we use an Arcade expression to return the number of assessments for each organization using the `FeatureSetByRelationshipName` method, as well as the domain name value related to the coded value using the `DomainName` method:

```javascript
var orgs = FeatureSetByPortalItem(portal,'92a0d44229bf4e24b1f0dbe1da1d7b1b',0,[*],false);

for (var org in orgs){
  console('Organization: ',org.Name)
  Console(DomainName(org, "Role"))

  feat = {
        attributes: {
            GlobalID: org.GlobalID,
            isDeleted: org.IsDeleted,
            Organization: org.Name,
            Description: org.Description,
            Type: DomainName(org, "Type"),
            Role: DomainName(org, "Role"),
            count_assessments: count(FeatureSetByRelationshipName(org, 'Assessment', ['*'], false)),
        },
    };
    Push(features, feat);

}
```
[See the full Arcade expression for organization summary data here.](./arcade-samples/dataexp-org_summary.js)

### Dynamic Status Indicators
You can create dynamic indicators for incident statuses such as "Active" or "Closed" :

```javascript
var active = $datapoint.EndDate;
var displayStatus = IIf(IsEmpty(active), "Active", "Closed");

return {
    textColor: IIf(displayStatus == "Active", "green", "red"),
    backgroundColor: "white",
    displayStatus: displayStatus
};
```

## Tips for Dashboard Design

1. Use Icons for Visual Cues:

    - Add SVG icons for status indicators (e.g., checkboxes for "Complete" or warnings for "In Progress"). [The NAPSG Symbology Library](https://www.napsgfoundation.org/all-resources/symbology-library/) is a great resource for online-accessible icons for Lifelines and Componenents.

2. Enhance Readability:

    - Group related data (e.g., display comments alongside the corresponding indicator).
3. Combine Data Sources:

    - Use FeatureSets to pull related data dynamically, enriching the dashboard experience.

4. Optimize Layout:
    - Ensure widgets are responsive and readable across different screen sizes.

---

## Appendix: Overview of the CLSS Feature Service Structure

### Layers and Tables

#### 1. Organization Layer (Layer 0)
- **Type**: Feature Layer (Polygon)
- **Description**: Represents organizations involved in emergency management and their respective operational areas.
- **Key Fields**:
  - `GlobalID`: Unique identifier for each organization.
  - `Name` and `Description`: Provide context for the organization.
  - `Role`: Indicates if the organization is a Host or Tenant.
  - **Coded Values for `Type`**: Identifies the type of organization (e.g., Community Agency, County Agency).
- **Relationships**:
  - Related to **Assessment Table** (1).
  - Related to **Hazard Table** (2).
  - Related to **Item Table** (4).

---

#### 2. Assessment Table (Table 1)
- **Type**: Standalone Table
- **Description**: Stores data about assessments linked to incidents and organizations.
- **Key Fields**:
  - `Content`: JSON-encoded data detailing lifeline and indicator statuses.
  - `IsCompleted`: Status of the assessment (Yes/No).
  - `OrganizationID`, `IncidentID`, and `TemplateID`: Foreign keys linking to related tables.
- **Relationships**:
  - Related to **Organization Layer** (0).
  - Related to **Incident Table** (3).
  - Related to **Template Table** (10).

---

#### 3. Hazard Table (Table 2)
- **Type**: Standalone Table
- **Description**: Details hazards associated with incidents and their respective organizations.
- **Key Fields**:
  - `Type`: Specifies hazard type (Man-made or Natural Disaster).
  - `Name` and `Description`: Provide hazard context.
- **Relationships**:
  - Related to **Organization Layer** (0).
  - Related to **Incident Table** (3).
  - Related to **Template Table** (10).

---

#### 4. Incident Table (Table 3)
- **Type**: Standalone Table
- **Description**: Represents incidents affecting organizations and requiring assessments.
- **Key Fields**:
  - `HazardID`: Links to the **Hazard Table**.
  - `StartDate` and `EndDate`: Indicate the active period of the incident.
- **Relationships**:
  - Related to **Assessment Table** (1).
  - Related to **Hazard Table** (2).

---

#### 5. Item Table (Table 4)
- **Type**: Standalone Table
- **Description**: Represents data or resources related to the organization.
- **Key Fields**:
  - `ItemType`: Specifies the type of item (e.g., Service, Contact, Map Layer).
  - `OrganizationID`: Links to the **Organization Layer**.
- **Relationships**:
  - Related to **Organization Layer** (0).
  - Related to **ItemLifeline Table** (5).

---

#### 6. ItemLifeline Table (Table 5)
- **Type**: Standalone Table
- **Description**: Links items to lifelines and their components/subcomponents.
- **Key Fields**:
  - `ItemID`, `LifelineID`, `LifelineComponentID`, `LifelineSubComponentID`: Foreign keys linking to related tables.
  - `Type`: Specifies the hierarchy (Lifeline, Component, Subcomponent).
- **Relationships**:
  - Related to **Item Table** (4).
  - Related to **Lifeline Table** (6).

---

#### 7. Lifeline Table (Table 6)
- **Type**: Standalone Table
- **Description**: Stores information about community lifelines.
- **Key Fields**:
  - `Name` and `Description`: Define the lifeline and its role in assessments.
- **Relationships**:
  - Related to **ItemLifeline Table** (5).
  - Related to **LifelineComponent Table** (7).

---

#### 8. LifelineComponent Table (Table 7)
- **Type**: Standalone Table
- **Description**: Details components under each lifeline.
- **Key Fields**:
  - `LifelineID`: Links to the **Lifeline Table**.
- **Relationships**:
  - Related to **Lifeline Table** (6).
  - Related to **LifelineSubcomponent Table** (8).

---

#### 9. LifelineSubcomponent Table (Table 8)
- **Type**: Standalone Table
- **Description**: Stores subcomponent details for lifelines.
- **Key Fields**:
  - `LifelineComponentID`: Links to the **LifelineComponent Table**.
- **Relationships**:
  - Related to **LifelineComponent Table** (7).

---

### Summary of Relationships

- **Organization Layer (0)**:
  - Central entity linking to the **Assessment**, **Hazard**, and **Item** tables.
- **Assessment Table (1)**:
  - Linked to specific incidents and templates.
- **Hazard Table (2)**:
  - Provides context for incidents and is tied to templates and organizations.
- **Incident Table (3)**:
  - Links assessments and hazards.
- **Lifelines (Tables 6-8)**:
  - Establish hierarchical relationships to define lifelines, components, and subcomponents.

This structure facilitates comprehensive analysis and reporting by interlinking organizations, assessments, incidents, and lifelines within the CLSS framework.


