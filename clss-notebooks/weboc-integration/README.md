# CLSS - WebOC Integration Sample


This folder provides a jumpstart for integrating the Community Lifeline Status System (CLSS) with WebEOC. It contains example notebooks and scripts to help you export, transform, and synchronize data between CLSS and WebEOC boards using the WebEOC and ArcGIS APIs.

## Purpose
- **Accelerate integration**: Offer ready-to-use code and workflows for common integration scenarios.
- **Demonstrate API usage**: Show how to authenticate, read, and write data to WebEOC from Python and JavaScript.
- **Enable data exchange**: Facilitate the transfer of assessment and status data between CLSS and WebEOC for enhanced situational awareness.

## Contents

- **export-clss.ipynb**  
  Export CLSS assessment data, transform it to WebEOC Lifeline Board format, and push it to WebEOC using the API. Includes code for authentication, data mapping, and record creation.

- **ReadWebEOC.ipynb**  
  Demonstrates how to authenticate with WebEOC, retrieve board data, and process it for use in CLSS or other systems.

- **Post-to-Webeoc.js**  
  Node.js script for posting records to WebEOC boards. Useful for automation or integration with other JavaScript-based systems.

## Getting Started

1. **Clone the CLSS Notebooks repository**  
   ```sh
   git clone https://github.com/Community-Lifeline-Status-System/clss-notebooks.git
   cd clss-notebooks/weboc-integration
   ```

2. **Install requirements**  
   - For Python notebooks:  
     - Python 3.x  
     - Jupyter Notebook  
     - `pip install -r requirements.txt` (see notebook cells for required packages)
   - For Node.js scripts:  
     - Node.js 18+  
     - `npm install` (if using additional packages)

3. **Configure credentials**  
   - Place a `config.json` file in this directory with your WebEOC and (if needed) ArcGIS credentials:
     ```json
     {
       "webeoc_username": "your_webeoc_username",
       "webeoc_password": "your_webeoc_password"
     }
     ```

4. **Run the notebooks or scripts**  
   - Open `export-clss.ipynb` or `ReadWebEOC.ipynb` in Jupyter and follow the instructions in each cell.
   - Run `dev-webeoc-post.js` with Node.js for JavaScript-based integration.

## Key Features

- **Authentication**: Securely connect to WebEOC REST API using session-based authentication.
- **Data Mapping**: Translate CLSS assessment fields to WebEOC board fields.
- **API Examples**: Read and write board records, including error handling and logging.
- **Extensible**: Adapt the code for your own boards, data models, or integration workflows.

## Limitations & Notes

- These scripts are intended as **starting points**. You may need to adapt field mappings, error handling, or authentication for your specific environment.
- Ensure you have the necessary permissions in both CLSS and WebEOC.
- Review and follow your organization's security and data governance policies before deploying integrations in production.

## References

- WebEOC REST API Technical Guide (Available to Juvare WebEOC users)

## Support

For questions or contributions, please contact the CLSS project team or open an issue in the repository.

---
