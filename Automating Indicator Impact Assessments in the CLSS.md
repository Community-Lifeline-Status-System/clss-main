# Concept Paper: Automating Indicator Impact Assessments in the CLSS

The Community Lifelines Status System (CLSS) enables organizations to
define and monitor key indicators for each Lifeline throughout an
incident. Today, these indicators rely on manual updates, with the
ability to link indicators to data. This limits the timeliness and
accuracy of situational awareness. This white paper outlines an initial
concept for automating indicator impact assessments based on data
threshold updates, including a proposed “attribute wiring” process,
sample use cases, and key design considerations. 

**Problem:** 

The CLSS enables organizations to define key indicators for each
Lifeline, assign relative weights, and manually update assessments of
these indicators throughout the lifecycle of an incident. Indicators can
be linked to relevant datasets registered in the Data Library but there
is no ability to automatically update the status of indicators based on
changes or thresholds in the linked data. By implementing a solution
that enables automated impact assessments of indicators rather than
manual assessments, the CLSS could provide more timely updates during
events. 

 
![image](https://github.com/user-attachments/assets/7a4362fb-ccfe-4c58-ad1d-0428ae13a07c)


**Potential Solutions / Approaches:** 

Establish a new process to enable ‘wiring’ specific attributes from a
linked dataset to indicator assessment. 

 

***Proposed “Wiring” Process: Attribute-to-Indicator Automation*** 

1.  **Dataset Linking** 

- User selects and links a dataset to a specific indicator. 

2.  **Attribute Selection Interface** 

- UI displays all available attributes (columns) in the dataset. 

<!-- -->

- Each attribute includes metadata (data type: categorical, numeric,
  boolean, etc.) to guide threshold definition. 

3.  **Attribute Wiring & Threshold Configuration** 

For each selected attribute, the user can configure logic rules that
translate data conditions into impact levels
(Minimal/Moderate/Significant). 

 


## Use Case A: Air Quality Index 

**Context:** 

**Indicator**: Air quality (Health & Medical Lifeline / Public Health
Component, Public Health Surveillance Subcomponent)  

| **Lifeline **     | Health & Medical     |
|-------------------|----------------------|
| **Component **    | Public Health        |
| **Subcomponent ** | Health Surveillance  |

   
   
**Dataset**: Air Quality Index (AQI) readings by jurisdiction*. ([Air
Quality \| US EPA](https://www.epa.gov/air-quality)) * 

**Attribute:** AQI (Integer) 

**Threshold Wiring Interface:** 

- User selects attribute **AQI**. 

<!-- -->

- System auto-detects it as an integer. 

<!-- -->

- User defines threshold ranges using a slider or input fields. 

**Example Logic Configuration:** 

| **AQI Range ** | **Indicator Impact Level ** |
|----------------|-----------------------------|
| **0–66 **      | Minimal / No Impact         |
| **67–149 **    | Moderate Impact             |
| **\>150  **    | Significant Impact          |

 

- Additional option: Allow user to select field aggregation logic (e.g.,
  *Maximum AQI*, *Average AQI*, or *Percentage of records above a
  threshold*). 

<!-- -->

- Optional: Let user preview how historical values would have triggered
  impacts.   

![image](https://github.com/user-attachments/assets/0151e5b3-4f55-44f2-ac3d-9c91c6d6e8b7)

## Use Case B: Shelter Capacity 

**Context:** 

**Indicator**: *Shelter capacity does not support the displaced
population* (Food/Water/Shelter Lifeline,    
 

| **Lifeline **     | Food, Water, Shelter  |
|-------------------|-----------------------|
| **Component **    | Shelter               |
| **Subcomponent ** | Housing               |

   
**Dataset**: *Shelter Status (WebEOC Board, ARC / FEMA Feature
Service).* 

**Attributes:** 

- Current Population 

<!-- -->

- Max Capacity 

**Wiring Logic Setup:** 

- User creates a derived condition: Current Population \>= Max Capacity 

<!-- -->

- System allows the user to count how many records meet this condition. 

**Example Threshold Rule:** 

| **Number of Shelters Over Capacity ** | **Indicator Impact Level ** |
|---------------------------------------|-----------------------------|
| **0 **                                | Minimal / No Impact         |
| **1–5 **                              | Moderate Impact             |
| **6 or more **                        | Significant Impact          |

 

- Additional option: Specify filter conditions (e.g., only include
  shelters in a certain county). 

<!-- -->

- Optional override: Allow user to manually downgrade severity
  post-evaluation with justification (e.g., contextual judgment).   
     
     
![image](https://github.com/user-attachments/assets/38662265-0d0d-4f07-9a0e-ec5d4e4786d6)

**Other thoughts** 

- Show real-time impact preview based on current dataset. 

<!-- -->

- Allow user to simulate dataset updates and view resulting indicator
  changes. 

<!-- -->

- Require manual review / override when data is incomplete (out of
  normal range?). 

<!-- -->

- Log all auto-assessments and thresholds for traceability. 

 
