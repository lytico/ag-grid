import { withPrefix } from 'gatsby';
import convertToFrameworkUrl from 'utils/convert-to-framework-url';
import { TYPE_LINKS } from './type-links';

export const inferType = value => {
    if (value == null) {
        return null;
    }

    if (Array.isArray(value)) {
        return value.length ? `${inferType(value[0])}[]` : 'object[]';
    }

    return typeof value;
};

const prefixRegex = new RegExp(`^${withPrefix('/')}`);

/**
 * Converts a root-based page link (e.g. /getting-started/) into one which is correct for the website
 * (e.g. /javascript-grid/getting-started/).
 */
export const convertUrl = (href, framework) => {
    const link = href || '';

    if (link.includes('/static/')) { return link; }

    return link.startsWith('/') ?
        // strip the prefix is case it's been applied, before creating the proper URL
        withPrefix(convertToFrameworkUrl(href.replace(prefixRegex, '/'), framework)) :
        href;
}

/**
 * Converts a subset of Markdown so that it can be used in JSON files.
 */
export const convertMarkdown = (content, framework) => content
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => `<a href="${convertUrl(href, framework)}">${text}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');


export function escapeGenericCode(lines) {

    // When you have generic parameters such as ChartOptions<any>
    // the <any> gets removed as the code formatter thinks its a invalid tag.

    // By adding a <span/> the generic type is preserved in the doc output

    // Regex to match all '<' but not valid links such as '<a ' and closing tags '</'
    const typeRegex = /<(?!a[\s]|[/])/g;
    const escapedLines = lines.join('\n').replace(typeRegex, '<<span/>');
    return escapedLines;
}

export function getTypeUrl(type, framework) {
    if (typeof type === 'string') {
        if (type.includes('|')) {
            // can't handle multiple types
            return null;
        } else if (type.endsWith('[]')) {
            type = type.replace(/\[\]/g, '');
        }
    }

    return convertUrl(TYPE_LINKS[type], framework);
};


export function getLinkedType(type, framework) {
    if (!Array.isArray(type)) {
        type = [type];
    }

    // Extract all the words to enable support for Union types
    const typeRegex = /\w+/g;
    const formattedTypes = type
        .filter(t => typeof (t) === 'string')
        .map(t => {
            const definitionTypes = [...t.matchAll(typeRegex)];

            const typesToLink = definitionTypes.map(regMatch => {
                const typeName = regMatch[0];
                const url = getTypeUrl(typeName, framework);

                return url ? {
                    toReplace: typeName,
                    link: `<a href="${url}" target="${url.startsWith('http') ? '_blank' : '_self'}" rel="noreferrer">${typeName}</a>`
                } : undefined;
            }).filter(dt => !!dt);

            let formatted = t;
            typesToLink.forEach(toLink => {
                formatted = formatted.split(toLink.toReplace).join(toLink.link);
            })

            return formatted;
        });

    return formattedTypes.join(' | ');
};

export function appendInterface(name, interfaceType, framework, allLines) {

    const lines = [`interface ${name} {`];
    const properties = Object.entries(interfaceType.type);
    properties.sort(([p1,], [p2,]) => {
        // Push $scope to the end while maintaining original order
        if (p1 === '$scope')
            return 1;
        if (p2 === '$scope')
            return -1;
        return 0;
    });
    properties
        // Only show AngularJS $scope property for Angular or Javascript frameworks
        .filter(([p,]) => p !== '$scope' || (framework === 'angular' || framework === 'javascript'))
        .forEach(([property, type]) => {
            const docs = interfaceType.docs && interfaceType.docs[property];
            if (!docs || (docs && !docs.includes('@deprecated'))) {
                addDocLines(docs, lines);
                lines.push(`  ${property}: ${getLinkedType(type, framework)};`);
            }
        });
    lines.push('}');
    allLines.push(...lines);
}

export function addDocLines(docs, lines) {
    if (!docs || docs.length === 0) {
        return;
    }
    docs.replace('/**\n *', '//').replace('\n */', '').split(/\n/g).forEach(s => {
        lines.push(`  ${s.replace('*/', '').replace(' *', '//')}`);
    });
}

export function appendCallSignature(name, interfaceType, framework, allLines) {
    const lines = [`interface ${name} {`];
    const args = Object.entries(interfaceType.type.arguments);
    const argTypes = args.map(([property, type]) => {
        return `${property}: ${getLinkedType(type, framework)}`;
    });
    lines.push(`    (${argTypes.join(', ')}) : ${interfaceType.type.returnType}`);
    lines.push('}');
    allLines.push(...lines);
}

export function appendEnum(name, interfaceType, allLines) {
    const lines = [`enum ${name} {`];
    const properties = interfaceType.type;
    properties.forEach((property) => {
        lines.push(`  ${property}`);
    });
    lines.push('}');
    allLines.push(...lines);
}

export function appendTypeAlias(name, interfaceType, allLines) {
    const shouldMultiLine = interfaceType.type.length > 20;
    const multiLine = shouldMultiLine ?
        `\n      ${interfaceType.type.split('|').join('\n    |')}\n` :
        interfaceType.type;
    allLines.push(`type ${name} = ${multiLine}`);
}
