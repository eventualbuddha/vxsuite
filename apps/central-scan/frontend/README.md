# VxCentralScan

A central scanner for batch scanning of ballots, often used for absentee ballot
processing.

## Setup

Follow the instructions in the [VxSuite README](../../../README.md) to get set
up, then run the app like so:

```sh
# In apps/central-scan/frontend
pnpm start
```


The server will be available at http://localhost:3000, with the backend at
http://localhost:3001. To use a different port, set the `FRONTEND_PORT`
environment variable and the backend port will use `$FRONTEND_PORT + 1`.


## Testing

```sh
pnpm test
```

## Development Tips

### Mock Scanning

To scan ballots without scanner hardware, enable the dev dock and use its batch
scanner UI to add PDF ballots. The dev dock is enabled automatically in
development mode. Each PDF's first two pages are used as the front and back of a
scanned sheet.

1. Start the app with the dev dock enabled (the default in development):
   ```sh
   pnpm start
   ```
2. Open the dev dock (the handle at the top of the screen).
3. Use the **Batch Scanner** controls to add ballot PDFs and then initiate a
   scan from the app UI.

### Testing Adjudication

To force `requires_adjudication` of ballots, run this in
`apps/central-scan/backend`:

```
sqlite3 dev-workspace/ballots.db 'update sheets set requires_adjudication = 1;'
```
