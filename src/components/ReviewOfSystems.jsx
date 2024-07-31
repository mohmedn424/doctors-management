import data from '../../systemsData.json';

import { Form, Input, Radio } from 'antd';

export default function ReviewOfSystems() {
  return (
    <Form size="large" layout="vertical">
      {data.map((item) => {
        const system = Object.entries(item)[0][0];
        const checkArr = Object.entries(item)[0][1];

        return (
          <Form.Item
            key={system}
            name={system}
            label={system}
            initialValue="none"
          >
            <Radio.Group
              size="middle"
              buttonStyle="solid"
              optionType="button"
            >
              {checkArr.map((cell) => (
                <Radio.Button key={cell} value={cell}>
                  {cell}
                </Radio.Button>
              ))}
              <Radio.Button key="none" value="none">
                none
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        );
      })}

      <Form.Item name="notes" label="notes/other">
        <Input.TextArea autoSize />
      </Form.Item>
    </Form>
  );
}
