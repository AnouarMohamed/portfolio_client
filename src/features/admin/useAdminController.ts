import { startTransition, useCallback, useEffect, useState } from 'react';
import { useCms } from '../../cms/useCms';
import {
  fetchAdminAnalytics,
  fetchAdminContent,
  fetchAuthSession,
  loginAdmin,
  logoutAdmin,
  saveAdminContent,
} from '../../cms/api';
import { DEFAULT_CMS_CONTENT } from '../../cms/defaultContent';
import type { AnalyticsSnapshot, CmsContent } from '../../cms/schema';
import type { AdminTab, AuthState } from './admin.constants';

export function useAdminController() {
  const { replaceContent } = useCms();
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [activeTab, setActiveTab] = useState<AdminTab>('site');
  const [content, setContent] = useState<CmsContent>(DEFAULT_CMS_CONTENT);
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAdminState = useCallback(async () => {
    setIsRefreshing(true);
    setFeedback('');

    try {
      const [envelope, analyticsSnapshot] = await Promise.all([
        fetchAdminContent(),
        fetchAdminAnalytics(),
      ]);
      setContent(envelope.content);
      setAnalytics(analyticsSnapshot);
      setUpdatedAt(envelope.updatedAt);
      replaceContent(envelope.content, envelope.updatedAt);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Could not load content.');
    } finally {
      setIsRefreshing(false);
    }
  }, [replaceContent]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const session = await fetchAuthSession();

        if (!session.authenticated) {
          setAuthState('unauthenticated');
          return;
        }

        setAuthState('authenticated');
        await loadAdminState();
      } catch {
        setAuthState('unauthenticated');
      }
    };

    void bootstrap();
  }, [loadAdminState]);

  const handleLogin = async () => {
    setFeedback('');

    try {
      await loginAdmin({ username, password });
      setPassword('');
      setAuthState('authenticated');
      await loadAdminState();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Login failed.');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback('');

    try {
      const envelope = await saveAdminContent(content);
      setContent(envelope.content);
      setUpdatedAt(envelope.updatedAt);
      replaceContent(envelope.content, envelope.updatedAt);

      try {
        setAnalytics(await fetchAdminAnalytics());
      } catch {
        // Saving content succeeded; analytics can be refreshed separately.
      }

      setFeedback('Changes saved.');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Could not save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    replaceContent(DEFAULT_CMS_CONTENT, null);
    startTransition(() => {
      setAuthState('unauthenticated');
      setContent(DEFAULT_CMS_CONTENT);
      setAnalytics(null);
      setUpdatedAt(null);
      setFeedback('');
      setUsername('');
      setPassword('');
    });
  };

  return {
    activeTab,
    analytics,
    authState,
    content,
    feedback,
    isRefreshing,
    isSaving,
    password,
    updatedAt,
    username,
    setActiveTab,
    setContent,
    setPassword,
    setUsername,
    handleLogin,
    handleLogout,
    handleSave,
    loadAdminState,
  };
}
