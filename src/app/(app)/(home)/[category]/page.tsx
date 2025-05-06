import React from 'react'

const page = async (
    props: { params: Promise<{ category: string }> }
) => {

    const params = await props.params;

    return (
        <div>
            {params.category}
        </div>
    )
}

export default page