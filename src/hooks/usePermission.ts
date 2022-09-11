import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permission = `system:${pageName}:${handleName}`
  const findPermissionBool = !!store.state.login.permissions.find((item) => item === permission)
  return findPermissionBool
}
