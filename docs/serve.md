## For MacOS

Create Sites directory in home folder (if doesn't already exist):
`mkdir ~/Sites`

Edit `/etc/apache2/httpd.conf` and set DocumentRoot to `/Users/<USERNAME>/Sites`:
```
DocumentRoot "/Users/<USERNAME>/Sites/"                                                                        
<Directory "/Users/<USERNAME>/Sites/">
```

Start Apache:
`sudo apachectl start`

Create symlink from Sites directory to location of code:
`ln -s ~/code/github/seobot /Users/<USERNAME>/Sites/seobot`

Visit http://localhost:80/seobot[http://localhost:80/seobot]
