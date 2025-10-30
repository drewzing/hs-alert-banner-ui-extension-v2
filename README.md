# HubSpot Alert Banner Card
Short: A CRM UI extension that surfaces record-level alerts.

## Demo
  - See alertcard.png

## Use cases
  - Warn agents on HS Record when `alert_present = true`
  - Display `alert_title`, `alert_type`, and `alert_message`

## Requirements
  - HubSpot account with CRM UI Extensions enabled
  - Properties on objects you target (examples below)
  - Scopes: `crm.objects.*`, `crm.objects.custom`, `crm.objects.cards.read`; for tickets, `tickets`

## Install (CLI)
```bash
# 1) Clone
git clone https://github.com/drewzing/hs-alert-banner-ui-extension-v2
cd hs-alert-banner-ui-extension-v2

# 2) Configure portal
# set your prod portal in hubspot.config.json (portalId) or via env

# 3) Upload
hs project upload
