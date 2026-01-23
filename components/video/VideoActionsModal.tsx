import { View, Text, TouchableOpacity, Pressable, Modal } from 'react-native';
import React from 'react';

interface VideoActionsModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const VideoActionsModal = ({
  visible,
  onClose,
  onEdit,
  onDelete,
}: VideoActionsModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            width: 220,
            backgroundColor: '#121212',
            borderRadius: 14,
            paddingVertical: 8,
            overflow: 'hidden',
          }}
          onPress={() => {}}
        >
          <TouchableOpacity
            style={{ paddingVertical: 12, paddingHorizontal: 14 }}
            activeOpacity={0.8}
            onPress={onEdit}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: '#2a2a2a' }} />

          <TouchableOpacity
            style={{ paddingVertical: 12, paddingHorizontal: 14 }}
            activeOpacity={0.8}
            onPress={onDelete}
          >
            <Text style={{ color: '#ff5a5a', fontSize: 16 }}>Delete</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default VideoActionsModal;
