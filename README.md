# A.R.C. Disco static website

The dist directory is a standalone static website. It contains 13 pages with the existing URL paths, original branding, text, photographs and locally hosted fonts. No installation, database, PHP, WordPress, jQuery, plugins or build step is required.

## Hosting

Upload the contents of dist to the document root of a static web host. Enable HTTPS and directory index.html handling. Keep the existing domain and paths to retain incoming links. A private review copy is separately hosted through Sites; that does not change arcdisco.co.uk.

Before changing production, back up the current site and DNS configuration. Once the static copy is approved and tested on the intended host, replace the old document root rather than uploading over WordPress. Remove PHP execution, the WordPress installation and database when no longer needed, and rotate hosting, FTP/SFTP, administrator and email credentials through the provider. Static files remove the WordPress/plugin attack surface but hosting and domain accounts still require protection. Preserve existing mail DNS records when changing web hosting.

## Enquiries

Both enquiry forms validate fields in the browser and open a prefilled email addressed to info@arcdisco.co.uk. The visitor must send it through their email app. This is stated beside each form. There is no server-side email service and no success message claiming delivery. Telephone and email links work directly. For delivery without an email app, configure a separate form service before launch.

## Editing

Edit the HTML in dist, CSS in dist/assets/site.css and JavaScript in dist/assets/site.js. Images and fonts are local assets. The gallery uses native HTML dialog controls and the menu uses a small script. Original text and terms are retained; review time-sensitive insurance/accreditation and legal claims before launch.

## Migration and verification

Copied the 13 business pages in the original page sitemap. Blog, author, tag and attachment archives are excluded. Two unavailable third-party badge images were removed. No third-party runtime assets or WordPress endpoints remain. All local page/asset links and CSS asset references were checked, and JavaScript syntax validation passed. Browser visual/interaction testing was unavailable because this session does not expose the supported browser-control tool.
