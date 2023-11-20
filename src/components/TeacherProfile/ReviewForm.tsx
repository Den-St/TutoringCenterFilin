'use client'
import { useCreateReview } from "@/hooks/createReview";
import { useAppSelector } from "@/hooks/redux";
import { Button, Form, Input } from "antd"

export const ReviewForm = () => {
    const {onCreateReview,loading} = useCreateReview();
    const isAuthed = !!useAppSelector(state => state.user.id);
    if(!isAuthed) return;
    console.log('fsd')
    return <Form onFinish={onCreateReview}>
        <Form.Item
        name={'text'}>
            <Input.TextArea/>
        </Form.Item>
        <Form.Item>
            <Button disabled={loading.create} htmlType={'submit'}>Відправити</Button>
        </Form.Item>
    </Form>
}