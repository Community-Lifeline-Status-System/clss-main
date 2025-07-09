# Community Lifeline Support System (CLSS): Integrations, Workflows, and Automations

---

## About CLSS

The **Community Lifeline Support System (CLSS)**  operationalizes real data for real-time impact assessments, highlighting critical community impacts and enhancing your community's resilience. Supported by DHS S&T, the CLSS was built specifically to support existing EOC data and information gathering workflows. It helps agencies focus, assess, and make decisions on what matters: the right data at the right time through the common framework of Community Lifelines.

The CLSS has been built and validated through direct contribution from over 300 emergency management agencies nationwide, ensuring the system meets the needs of emergency managers from the State, Local, Tribal, and Territorial (SLTT) levels. Now, the time has come to embrace the future of data informed decision making.

## Connect CLSS with Your Existing Tools and Workflows
CLSS is built on ArcGIS, an open, extenisble platform, which makes it possible to connect CLSS data with other systems, including WebEOC, Microsoft Teams, Survey123, and ArcGIS Dashboards.

*Key examples:*

- **Incident Management Systems (Integration Sample)**  
  Sample code to integrate data between CLSS (using ArcGIS REST/Python API) and WebEOC.  
  See: [WebEOC Integration Jumpstart](clss-notebooks/weboc-integration/README.md)

- **Microsoft Teams (Integration Sample)**  
  Embed CLSS dashboards and workflows directly into Teams for enhanced collaboration and situational awareness.  
  See: [Integrating CLSS in Teams](CLSS-TeamsIntegration.md)

- **ArcGIS Dashboard & Survey123 (Integration Sample)**  
  Connect CLSS with ArcGIS Dashboards for visualization and with Survey123 for field data collection and automated assessments.  
  See: [CLSS Dashboard](clss-dashboard/readme.md) | [CLSS Survey123](clss-survey123/)

- **Export/Import CLSS Templates (Workflow/Automation Sample)**  
  Sample code to export and import CLSS template data and WebEOC.  
  See: [WebEOC Integration Jumpstart](clss-notebooks/weboc-integration/README.md)

- **Notification Platforms (Concept Paper)**  
  Enable notifications via Microsoft Power Automate, Azure Functions, AWS Lambda, or on-premises solutions to alert users of key events and status changes.  
  See: [Enabling CLSS Notifications](CLSS-Notifications.md)

- **Automated Impact Assessments (Concept Paper)**  
  Automate indicator impact assessments using data-driven thresholds and logic.  
  See: [Automating Indicator Impact Assessments in the CLSS](Automating%20Indicator%20Impact%20Assessments%20in%20the%20CLSS.md)

---

## 📂 Repository Structure

- [`clss-dashboard/`](clss-dashboard/readme.md): ArcGIS Dashboard integration and samples
- [`clss-notebooks/`](clss-notebooks/README.md): Example notebooks and integration scripts
  - [`weboc-integration/`](clss-notebooks/weboc-integration/README.md): WebEOC integration jumpstart
  - [`templates/`](clss-notebooks/templates/): Sample for exporting/importing CLSS Templates
- [`clss-survey123/`](clss-survey123/): Survey123 forms and resources
- [`CLSS-TeamsIntegration.md`](CLSS-TeamsIntegration.md): Guide to integrating CLSS with Microsoft Teams
- [`CLSS-Notifications.md`](CLSS-Notifications.md): Notification platform options and setup
- [`Automating Indicator Impact Assessments in the CLSS.md`](Automating%20Indicator%20Impact%20Assessments%20in%20the%20CLSS.md): Concept paper on automated assessments

---

## Getting Started

1. **Explore the integration guides and samples** linked above.
2. **Clone this repository** and adapt the provided notebooks, scripts, and templates to your environment.
3. **Review the documentation** for each integration to ensure proper configuration and security.

---


> **Developed by:** [G&H International](https://ghinternational.com/)  **In collaboration with:** [Central U.S. Earthquake Consortium (CUSEC)](https://cusec.org/)
>
> **DHS S&T Contract #:** 70RSAT22CB0000012


---
