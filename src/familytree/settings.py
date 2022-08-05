"""
Django settings for familytree project.

Generated by 'django-admin startproject' using Django 4.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""
# from familytree.secret_settings import *
from pathlib import Path
import os.path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-d%i@nh^cvh7f*+k0b)gnz#r3s=1sib+k9+wgfdn__uw@nq7(!#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'django.contrib.humanize',
    'tinymce',
    'taggit',
    'easy_thumbnails',
    'mathfilters',
    'dbbackup',
    'django_cron',
    'stronghold',
    'people',
]

# TinyMCE configuration
TINYMCE_DEFAULT_CONFIG = {'relative_urls': False,
                          'plugins': 'paste,link,lists',
                          'language': 'en',
                          'width': '100%',
                          'paste_text_sticky': True,
                          'paste_text_sticky_default': True,
                          'paste_text_linebreaktype': 'p',
                          'toolbar': 'bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist blockquote | link unlink | subscript superscript | undo redo'}

# Taggit
TAGGIT_TAGS_FROM_STRING = 'people.forms.tag_comma_splitter'
TAGGIT_STRING_FROM_TAGS = 'people.forms.tag_comma_joiner'



# URLs
ROOT_URLCONF = 'urls'
LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_URL = '/logout/'



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'familytree.urls'

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.debug',
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(os.path.dirname(__file__), 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {'debug': DEBUG,
                    'context_processors': [
                        'django.contrib.auth.context_processors.auth',
                        'django.contrib.messages.context_processors.messages',
                        'django.template.context_processors.debug',
                        'django.template.context_processors.media',
                        'django.template.context_processors.request',
                        'django.template.context_processors.static',
                        'django_settings_export.settings_export',
                    ]},
    }
]

WSGI_APPLICATION = 'familytree.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



# Send 500 errors to admins and log DB request counts in DEBUG mode.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'mail_admins': {'level': 'ERROR', 'filters': ['require_debug_false'], 'class': 'django.utils.log.AdminEmailHandler'},
        'console': {'level': 'DEBUG', 'class': 'logging.StreamHandler'},
    },
    'filters': {'require_debug_false': {'()': 'django.utils.log.RequireDebugFalse'}},
    'loggers': {
        'django.request': {'handlers': ['mail_admins'], 'level': 'ERROR', 'propagate': True},
        'middleware': {'handlers': ['console'], 'level': 'DEBUG'},
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = '/var/www/familytree-static'
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

MEDIA_URL = '/media/'
MEDIA_ROOT = 'media' if DEBUG else '/var/www/familytree-media'

SITE_ID = 1

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'




# Back-ups
DBBACKUP_STORAGE_OPTIONS = {'oauth2_access_token': '<Dropbox OAuth2 token>',}
DBBACKUP_STORAGE_OPTIONS = {'access_key': '<Amazon S3 access key>',
                            'secret_key': '<Amazon S3 secret key>',
                            'bucket_name': '<Amazon S3 bucket name>',
                            'host': '<Amazon S3 region-specific host name>'}


ADMIN_NAME = 'Henry Diaz'
ADMIN_EMAIL = 'HenryDiazLDS@gmail.com'



# Geocoding and map secrets
OPENCAGE_API_KEY = '5629f794a0d3423b8e27aaa648ecf493'

MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGVucnlkaWF6bGRzIiwiYSI6ImNsNDBsN25tYTE2eW0zY2txZWpra3k0amUifQ.KsvSoM4VC5IGdaCfwu-geA'



SETTINGS_EXPORT = ('OPENCAGE_API_KEY','MAPBOX_ACCESS_TOKEN', 'ADMIN_NAME', 'ADMIN_EMAIL')