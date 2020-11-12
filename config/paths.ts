import path from 'path'

/* Environment */ 
const root   = path.join(__dirname, '..')
const src    = path.join(root, 'src')
const dist   = path.join(root, 'dist')
const config 	  = path.join(root,   'config')
const config_jest = path.join(config, 'jest')


/* Source */
const client     = path.join(src, 'client')
const component  = path.join(client, 'component')
const index_html = path.join(client, 'index.html')

const server     = path.join(src, 'server')

const inter_face = path.join(src, 'interface')
const domain     = path.join(src, 'interface', 'domain')


/* Distribution */
const content_base = path.join(dist, 'client')


const Path = {
	root, src, dist, 
	config, config_jest,
    
    client, component,
    index_html,
    interface: inter_face, domain,
	server,
	
	content_base,
} 



export { 
    Path
} 

