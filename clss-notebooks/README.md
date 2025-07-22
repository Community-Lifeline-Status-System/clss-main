# CLSS Notebooks

This repository contains a collection of Jupyter notebooks for various use cases related to CLSS (Community Lifeline Status System). Each subfolder contains notebooks and scripts designed for specific tasks.


## Subfolders and Notebooks

### 1. `templates`

This folder contains notebooks for exporting and importing CLSS templates.

- **`clss_template-export.ipynb`**: 
  - **Description**: Exports the CLSS templates and related data to the `export` directory for backup, migration, or further analysis.
  - **Prerequisites**:
    - Upload necessary input files to the `/home` directory.
    - Ensure a `config.json` file is present in the `/home` directory with ArcGIS Online credentials.
  - **Steps**:
    1. Load and validate files.
    2. Authenticate with ArcGIS Online.
    3. Export data.
    4. Save exported data.

   🎥 [Watch: CLSS Template Import Notebook – Video Overview](https://vimeo.com/1103549991?share=copy)

       

- **`clss-template-import-notebook.ipynb`**: 
  - **Description**: Imports the CLSS templates and related data into the selected feature service.
  - **Prerequisites**:
    - Use the 'export template' process in the CLSS to export the CLSS templates.

    - **Steps**:
    1. Load and validate files.
    2. Select the target feature service.
    3. Import data.

### 2. `weboc-integration`

This folder contains notebooks and scripts for integrating WebOC with CLSS.

- **`export-clss.ipynb`**: 
  - **Description**: Exports data from CLSS, processes and transforms it for WebOC integration, and saves the processed data in the required format.
  - **Prerequisites**:
    - Python 3.x
    - Jupyter Notebook
  - **Steps**:
    1. Clone the repository.
    2. Install the required libraries and open the notebook in a Jupyter Notebook session.
    3. Alternatively, import the notebook file in ArcGIS Online.

- **`ReadWebEOC.ipynb`**: 
  - **Description**: Demonstrates the process for exporting assessment data from CLSS to the WebEOC Lifeline board using the WebEOC API.
  - **Steps**:
    1. Authenticate with WebEOC.
    2. Fetch and process data.
    3. Export data to WebEOC.

## General Notes

- Ensure that all necessary input files are correctly formatted and contain the required data for the respective processes.
- Follow the steps outlined in each notebook to ensure successful execution.

## Links

-

---

For more detailed instructions, refer to the individual notebooks and their respective documentation.

