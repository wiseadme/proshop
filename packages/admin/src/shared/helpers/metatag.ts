export const descriptorToMetaTag = (descriptor) => {
    let tag = '<meta'
    const tagEnd = '/>'

    Object.keys(descriptor).forEach((it) => {
        tag += ` ${ it }="${ descriptor[it] }"`
    })

    tag += tagEnd

    return tag
}
