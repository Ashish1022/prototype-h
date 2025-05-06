import React from 'react'

const page = async (
    props: { params: Promise<{ subcategory: string }> }
) => {

    const params = await props.params;

    return (
        <div>
            {params.subcategory}
        </div>
    )
}

export default page