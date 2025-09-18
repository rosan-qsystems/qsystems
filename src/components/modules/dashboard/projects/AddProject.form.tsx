export const AddProjectForm = () => {
    return <div>
        <div className="flex flex-col gap-4">
            <TextInput
                label="Name"
                variant="filled"
                withAsterisk
                placeholder="Enter Project Name"
            />
            <div>
                <Text size="sm" fw={500}>
                    Description <span style={{ color: "red" }}>*</span>
                </Text>
                <RichTextEditor editor={editor} variant="subtle" className="h-80">
                    <RichTextEditor.Toolbar
                        sticky
                        stickyOffset="var(--docs-header-height)"
                    >
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                            <RichTextEditor.Highlight />
                            <RichTextEditor.Code />
                        </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                </RichTextEditor>
            </div>
            <Select
                label="Board Type"
                variant="filled"
                placeholder="Select Board Type"
                withAsterisk
                data={["Kanban", "Scrum"]}
            />
        </div>
        <Group justify="flex-end" mt="xl">
            <Button variant="outline" color="rgba(3,3,3,1)">
                Cancel
            </Button>
            <Button variant="filled" color="rgba(3,3,3,1)">
                Create Project
            </Button>
        </Group>
    </div>
}