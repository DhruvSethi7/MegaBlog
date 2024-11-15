import { Container,PostForm } from '../components/index'
import React from 'react'
function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <PostForm />
            </Container>
        </div>
      )
}

export default AddPost