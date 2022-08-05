# Copy this file and name it secret_settings.py
# It will be included by settings.py to provide the necessary
# installation-specific API settings/secrets.

DOMAIN = '<Domain on which to receive requests>'
HOST = '<Server host name>'


# Django secret
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-d%i@nh^cvh7f*+k0b)gnz#r3s=1sib+k9+wgfdn__uw@nq7(!#'

# Geocoding and map secrets
OPENCAGE_API_KEY = '5629f794a0d3423b8e27aaa648ecf493'

MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGVucnlkaWF6bGRzIiwiYSI6ImNsNDBsN25tYTE2eW0zY2txZWpra3k0amUifQ.KsvSoM4VC5IGdaCfwu-geA'


# Back-ups
# DBBACKUP_STORAGE_OPTIONS = {'oauth2_access_token': '<Dropbox OAuth2 token>',}
# DBBACKUP_STORAGE_OPTIONS = {'access_key': '<Amazon S3 access key>',
#                             'secret_key': '<Amazon S3 secret key>',
#                             'bucket_name': '<Amazon S3 bucket name>',
#                             'host': '<Amazon S3 region-specific host name>'}

ADMIN_NAME = 'Henry Diaz'
ADMIN_EMAIL = 'HenryDiazLDS@gmail.com'
