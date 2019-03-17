import CMS from 'netlify-cms'

import InfoPagePreview from './preview-templates/InfoPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import TietopankkiPagePreview from './preview-templates/TietopankkiPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('info', InfoPagePreview)
CMS.registerPreviewTemplate('tietopankki', TietopankkiPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
